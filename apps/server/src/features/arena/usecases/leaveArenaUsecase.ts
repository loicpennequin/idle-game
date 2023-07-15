import { UUID } from '@daria/shared';
import {
  BadRequestError,
  NotFoundError,
  UnexpectedError,
  errorFactory
} from '../../../utils/errorFactory';
import { UseCase } from '../../../utils/helpers';
import { Arena } from '../arena.entity';
import { ArenaRepository } from '../arena.repository';
import { isLeft, left } from 'fp-ts/Either';

export type LeaveArenaUseCaseInput = {
  arenaId: UUID;
  heroId: UUID;
};

export type LeaveArenaUseCaseError = UnexpectedError | BadRequestError | NotFoundError;

export type LeaveArenaUseCase = UseCase<
  LeaveArenaUseCaseInput,
  Arena,
  LeaveArenaUseCaseError
>;

type Dependencies = { arenaRepo: ArenaRepository };

export const leaveArenaUseCase =
  ({ arenaRepo }: Dependencies): LeaveArenaUseCase =>
  async ({ arenaId, heroId }) => {
    const arena = await arenaRepo.findById(arenaId);
    if (isLeft(arena)) {
      return arena;
    }

    const isInRoom = arena.right.heroes.some(h => h.id === heroId);
    if (!isInRoom) {
      return left(
        errorFactory.badRequest({ message: `Hero ${heroId} is not in arena ${arenaId}` })
      );
    }

    return arenaRepo.leave({ arenaId, heroId });
  };
