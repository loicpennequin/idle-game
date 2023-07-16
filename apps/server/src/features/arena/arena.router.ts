import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES, errorFactory } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';

const s = initServer();

export const arenaRouter = s.router(contract.arena, {
  async getAll({ req: { container } }) {
    return pipe(
      await container.getAllArenasUseCase(),
      container.responseMapper(
        HTTP_STATUS_CODES.OK,
        container.arenaMapper.toResponseArray
      )
    );
  },

  async getById({ req: { container } }) {
    return {
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: container.errorMapper.toResponse(
        errorFactory.unexpected({ message: 'Not Implemented.' })
      )
    };
  },

  async join({ params, body, req: { container } }) {
    return pipe(
      await container.joinArenaUseCase({
        arenaId: params.arenaId,
        heroId: body.heroId
      }),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.arenaMapper.toResponse)
    );
  },

  leave({ req: { container } }) {
    return Promise.resolve({
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: container.errorMapper.toResponse(
        errorFactory.unexpected({ message: 'Not implemented' })
      )
    });
  }
});
