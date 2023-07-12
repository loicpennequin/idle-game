import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';
import { makeSuccess } from '../../utils/helpers';

const s = initServer();

export const authRouter = s.router(contract.auth, {
  async login({ body, req: { container } }) {
    return pipe(
      await container.loginUseCase(body),
      container.responseMapper(HTTP_STATUS_CODES.OK, ({ accessToken }) => ({
        accessToken
      }))
    );
  },

  async logout({ req: { container } }) {
    const result = await container.logoutUseCase();

    return container.responseMapper(HTTP_STATUS_CODES.OK, makeSuccess)(result);
  },

  async refresh({ req: { container } }) {
    return pipe(
      await container.refreshJwtUseCase(),
      container.responseMapper(HTTP_STATUS_CODES.OK, ({ accessToken }) => ({
        accessToken
      }))
    );
  }
});
