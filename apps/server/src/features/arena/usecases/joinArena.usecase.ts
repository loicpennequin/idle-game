import { Nullable, UUID } from '@daria/shared';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
  errorFactory
} from '../../../utils/errorFactory';
import { UseCase } from '../../../utils/helpers';
import { Arena } from '../arena.entity';
import { ArenaRepository } from '../arena.repository';
import { isLeft, left } from 'fp-ts/Either';
import { User } from '../../user/user.entity';
import { HeroRepository } from '../../hero/hero.repository';

export type JoinArenaUseCaseInput = {
  arenaId: UUID;
  heroId: UUID;
};
export type JoinArenaUseCaseError =
  | UnexpectedError
  | BadRequestError
  | NotFoundError
  | ForbiddenError;

export type JoinArenaUseCase = UseCase<
  JoinArenaUseCaseInput,
  Arena,
  JoinArenaUseCaseError
>;

type Dependencies = {
  arenaRepo: ArenaRepository;
  heroRepo: HeroRepository;
  session: User;
};

export const joinArenaUseCase =
  ({ arenaRepo, heroRepo, session }: Dependencies): JoinArenaUseCase =>
  async ({ arenaId, heroId }) => {
    const hero = await heroRepo.findById(heroId);
    if (isLeft(hero)) return hero;

    if (session.id !== hero.right.id) {
      return left(errorFactory.forbidden());
    }

    const arena = await arenaRepo.findById(arenaId);
    if (isLeft(arena)) return arena;

    const isFull = arena.right.heroes.length === arena.right.maxslots;
    if (isFull) return left(errorFactory.badRequest({ message: 'No slot available' }));

    const hasAlreadyJoined = arena.right.heroes.some(hero => hero.id === heroId);
    if (hasAlreadyJoined) {
      return left(
        errorFactory.badRequest({ message: `Hero ${heroId} is already in the arena` })
      );
    }

    return arenaRepo.join({ arenaId, heroId });
  };
