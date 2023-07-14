import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';

const s = initServer();

export const heroRouter = s.router(contract.hero, {
  async getAll({ req: { container } }) {
    return pipe(
      await container.getAllHerosUseCase(),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.heroMapper.toResponseArray)
    );
  }
});
