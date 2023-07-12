import { contract, isString } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES, errorFactory } from '../../utils/errorFactory';
import { isRight } from 'fp-ts/Either';
import { REFRESH_TOKEN_COOKIE } from '../../utils/constants';
import { pipe } from 'fp-ts/function';
import { makeSuccess } from '../../utils/helpers';

const s = initServer();

export const authRouter = s.router(contract.auth, {
  async login({ body, res, req: { container } }) {
    const { config, loginUseCase, responseMapper } = container;
    const tokens = await loginUseCase(body);

    if (isRight(tokens)) {
      res.cookie(REFRESH_TOKEN_COOKIE, tokens.right.refreshToken, {
        path: config.REFRESH_TOKEN.PATH,
        httpOnly: config.REFRESH_TOKEN.HTTPONLY,
        secure: config.REFRESH_TOKEN.SECURE,
        sameSite: config.REFRESH_TOKEN.SAMESITE,
        maxAge: Date.now() + config.REFRESH_TOKEN.EXPIRES_IN_SECONDS * 1000
      });
    }

    return pipe(
      tokens,
      responseMapper(HTTP_STATUS_CODES.OK, ({ accessToken }) => ({ accessToken }))
    );
  },

  async logout({ req: { cookies, container } }) {
    const cookie = cookies?.[REFRESH_TOKEN_COOKIE];
    if (cookie && isString(cookie)) {
      const result = await container.logoutUseCase(cookie);

      return container.responseMapper(HTTP_STATUS_CODES.OK, makeSuccess)(result);
    }

    return {
      status: HTTP_STATUS_CODES.OK,
      body: makeSuccess()
    };
  },

  refresh: ({ req: { container } }) => {
    return Promise.resolve({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: container.errorMapper.toResponse(
        errorFactory.unexpected({ message: 'Not implemented.' })
      )
    });
  }
});
