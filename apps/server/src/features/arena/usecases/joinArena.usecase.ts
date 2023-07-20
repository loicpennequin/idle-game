import { UUID, randomInt } from '@daria/shared';
import { subject } from '@casl/ability';
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
  errorFactory
} from '../../../utils/errorFactory';
import { UseCase } from '../../../utils/helpers';
import { Arena } from '../entities/arena.entity';
import { ArenaRepository } from '../arena.repository';
import * as E from 'fp-ts/Either';
import * as IO from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';
import { User } from '../../user/user.entity';
import { HeroRepository } from '../../hero/hero.repository';
import { HeroAbilityBuilder } from '../../hero/hero.ability';
import { UserAbilityBuilder } from '../../user/user.ability';
import { Emitter } from '../../core/event-emitter';

export type JoinArenaUseCaseInput = {
  arenaId: UUID;
  heroId: UUID;
};
export type JoinArenaUseCaseError = UnexpectedError | NotFoundError | ForbiddenError;

export type JoinArenaUseCase = UseCase<
  JoinArenaUseCaseInput,
  Arena,
  JoinArenaUseCaseError
>;

type Dependencies = {
  arenaRepo: ArenaRepository;
  heroRepo: HeroRepository;
  heroAbilityBuilder: HeroAbilityBuilder;
  userAbilityBuilder: UserAbilityBuilder;
  session: User;
  emitter: Emitter;
};

export const joinArenaUseCase =
  ({
    arenaRepo,
    heroRepo,
    userAbilityBuilder,
    heroAbilityBuilder,
    session,
    emitter
  }: Dependencies): JoinArenaUseCase =>
  async ({ arenaId, heroId }) => {
    const hero = await heroRepo.findById(heroId);
    if (E.isLeft(hero)) return hero;

    const userAbility = userAbilityBuilder.buildFor(session);
    if (userAbility.cannot('edit', subject('Hero', hero.right))) {
      return E.left(errorFactory.forbidden());
    }

    const arena = await arenaRepo.findById(arenaId);
    if (E.isLeft(arena)) return arena;

    const heroAbility = heroAbilityBuilder.buildFor(hero.right);
    if (heroAbility.cannot('join', subject('Arena', arena.right))) {
      return E.left(errorFactory.forbidden());
    }

    const position = {
      x: randomInt(arena.right.size),
      y: randomInt(arena.right.size)
    };

    return pipe(
      await arenaRepo.join({ arenaId, heroId, position }),
      E.map(arena => {
        emitter.emit('HERO_JOIND_ARENA', { arenaId, heroId });
        return arena;
      })
    );
  };
