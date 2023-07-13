import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES, errorFactory } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';
import { fromNullable } from 'fp-ts/lib/Either';
const s = initServer();

export const userRouter = s.router(contract.user, {
  async signup({ body, req: { container } }) {
    return pipe(
      await container.signupUseCase(body),
      container.responseMapper(HTTP_STATUS_CODES.CREATED, container.userMapper.toResponse)
    );
  }
});
