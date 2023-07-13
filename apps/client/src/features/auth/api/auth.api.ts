import jwtDecode from 'jwt-decode';
import type { ClientInferRequest, ClientInferResponses } from '@ts-rest/core';
import type { HttpService } from '@/features/core/api/http.service';
import type { ApiClient } from '@/features/core/apiClient';
import { apiHandler } from '@/utils/api-helpers';
import { authContract, type Nullable } from '@daria/shared';

export type LoginRequest = ClientInferRequest<typeof authContract.login>;
export type LoginResponse = ClientInferResponses<typeof authContract.login, 200>;
export type LogoutResponse = ClientInferResponses<typeof authContract.logout, 200>;
export type RefreshJwtResponse = ClientInferResponses<typeof authContract.refresh, 200>;

export type AuthApi = {
  login: (input: LoginRequest['body']) => Promise<LoginResponse['body']>;
  logout: () => Promise<LogoutResponse['body']>;
  refreshJwt: () => Promise<RefreshJwtResponse['body']>;
  init: () => Promise<void>;
};

type Dependencies = { apiClient: ApiClient; http: HttpService };

export const REFRESH_ENDPOINT = authContract.refresh.path;
export const LOGIN_ENDPOINT = authContract.login.path;
export const LOGOUT_ENDPOINT = authContract.logout.path;
export const AUTH_HEADER = 'authorization';

type JwtPayload = {
  sub: string;
  iat: number;
  exp: number;
};

export const authApi = ({ apiClient, http }: Dependencies): AuthApi => {
  let token: Nullable<string> = null;
  const getBearer = (token: string) => (token ? `JWT ${token}` : '');

  const addHeaders = () => {
    http.onRequest(config => {
      if (!token) return;

      if (!config.options.headers) {
        config.options.headers = new Headers();
      }

      const headers = config.options.headers as Headers;
      if (!headers.has(AUTH_HEADER)) {
        headers.set(AUTH_HEADER, getBearer(token));
      }
    });
  };

  const handleRedirects = () => {
    http.onResponse(({ response }) => {
      if (
        response.url.includes(LOGIN_ENDPOINT) ||
        response.url.includes(REFRESH_ENDPOINT)
      ) {
        return;
      }

      if (response.status === 401) {
        window.location.href = '/login';
      }
    });
  };

  const checkJwtExpiration = (jwt: string) => {
    const { exp } = jwtDecode<JwtPayload>(jwt);
    const now = new Date();
    const expirationDate = new Date(exp * 1000); // exp is in seconds

    return now.getTime() > expirationDate.getTime();
  };

  const refreshJwt = async () => {
    const response = await apiClient.auth.refresh();
    if (response.status === 200) {
      token = response.body.accessToken;
    }
  };

  const handleRefreshToken = () => {
    // keeping track of the refresh promise for deduping
    // we want to dedupe the refresh token call to ensure it's only called once when needed
    let ongoingRefreshPromise: Nullable<Promise<void>>;

    const refreshJwtIfExpired = async () => {
      if (!token) return;

      const isExpired = checkJwtExpiration(token);
      if (!isExpired) return;
      token = null;

      await refreshJwt();
    };

    http.onRequest(async config => {
      if (
        config.request.toString().includes(LOGIN_ENDPOINT) ||
        config.request.toString().includes(REFRESH_ENDPOINT)
      ) {
        return;
      }

      if (!ongoingRefreshPromise) {
        ongoingRefreshPromise = refreshJwtIfExpired();
      }

      await ongoingRefreshPromise;
      ongoingRefreshPromise = null;
    });
  };

  return {
    login: body => apiHandler(apiClient.auth.login, { body }),
    logout: () => apiHandler(apiClient.auth.logout),
    refreshJwt: () => apiHandler(apiClient.auth.refresh),
    init() {
      handleRefreshToken();
      addHeaders();
      handleRedirects();

      return refreshJwt();
    }
  };
};
