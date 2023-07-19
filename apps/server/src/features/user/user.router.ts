import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';

const s = initServer();

export const userRouter = s.router(contract.user, {
  async signup({ body, req: { container } }) {
    return pipe(
      await container.signupUseCase(body),
      container.responseMapper(HTTP_STATUS_CODES.CREATED, container.userMapper.toResponse)
    );
  },

  async updateProfile({ body, params, req: { container } }) {
    return pipe(
      await container.updateProfileUseCase({ userId: params.userId, profile: body }),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.userMapper.toResponse)
    );
  },

  async userHeroes({ params, req: { container } }) {
    return pipe(
      await container.getUserHeroesUseCase(params.userId),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.heroMapper.toResponseArray)
    );
  }
});
