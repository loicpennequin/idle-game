import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';
import { execute } from '../../utils/helpers';

const s = initServer();

export const userRouter = s.router(contract.user, {
  signup: ({ body, req: { container } }) => {
    return pipe(
      container.signupUseCase(body),
      container.responseMapper(
        HTTP_STATUS_CODES.CREATED,
        container.userMapper.toResponse
      ),
      execute
    );
  }
});
