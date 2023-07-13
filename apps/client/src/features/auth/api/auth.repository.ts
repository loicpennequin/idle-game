import type { ApiClient } from '@/features/core/apiClient';
import { apiHandler } from '@/utils/api-helpers';
import type { authContract } from '@daria/shared';
import type { ClientInferRequest, ClientInferResponses } from '@ts-rest/core';

export type LoginRequest = ClientInferRequest<typeof authContract.login>;
export type LoginResponse = ClientInferResponses<typeof authContract.login, 200>;
export type LogoutResponse = ClientInferResponses<typeof authContract.logout, 200>;
export type RefreshJwtResponse = ClientInferResponses<typeof authContract.refresh, 200>;

export type AuthRepository = {
  login: (input: LoginRequest['body']) => Promise<LoginResponse['body']>;
  logout: () => Promise<LogoutResponse['body']>;
  refreshJwt: () => Promise<RefreshJwtResponse['body']>;
};

export const authRepository = ({
  apiClient
}: {
  apiClient: ApiClient;
}): AuthRepository => {
  return {
    login: body => apiHandler(apiClient.auth.login, { body }),
    logout: () => apiHandler(apiClient.auth.logout),
    refreshJwt: () => apiHandler(apiClient.auth.refresh)
  };
};
