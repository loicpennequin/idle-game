import { UUID } from '@daria/shared';
import {
  BadRequestError,
  UnexpectedError,
  errorFactory
} from '../../../utils/errorFactory';
import { UseCase } from '../../../utils/helpers';
import { Arena } from '../arena.entity';
import { ArenaRepository } from '../arena.repository';
import { isLeft, left } from 'fp-ts/Either';

export type JoinArenaUseCaseInput = {
  arenaId: UUID;
  heroId: UUID;
};

export type JoinArenaUseCaseError = UnexpectedError | BadRequestError;

export type JoinArenaUseCase = UseCase<
  JoinArenaUseCaseInput,
  Arena,
  JoinArenaUseCaseError
>;

type Dependencies = { arenaRepo: ArenaRepository };

export const joinArenaUseCase =
  ({ arenaRepo }: Dependencies): JoinArenaUseCase =>
  async ({ arenaId, heroId }) => {
    const arena = await arenaRepo.findById(arenaId);
    if (isLeft(arena)) {
      return left(errorFactory.badRequest({ message: `no arena with id ${arenaId}` }));
    }

    if (arena.right.heroes.length === arena.right.maxslots) {
      return left(errorFactory.badRequest({ message: 'No slot available' }));
    }

    return arenaRepo.join({ arenaId, heroId });
  };
