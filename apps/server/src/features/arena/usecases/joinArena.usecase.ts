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
import { isLeft, left } from 'fp-ts/Either';
import { User } from '../../user/user.entity';
import { HeroRepository } from '../../hero/hero.repository';
import { HeroAbilityBuilder } from '../../hero/hero.ability';
import { UserAbilityBuilder } from '../../user/user.ability';
import { Io } from '../../core/io';

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
  io: Io;
};

export const joinArenaUseCase =
  ({
    arenaRepo,
    heroRepo,
    userAbilityBuilder,
    heroAbilityBuilder,
    session,
    io
  }: Dependencies): JoinArenaUseCase =>
  async ({ arenaId, heroId }) => {
    const hero = await heroRepo.findById(heroId);
    if (isLeft(hero)) return hero;

    const userAbility = userAbilityBuilder.buildFor(session);
    if (userAbility.cannot('edit', subject('Hero', hero.right))) {
      return left(errorFactory.forbidden());
    }

    const arena = await arenaRepo.findById(arenaId);
    if (isLeft(arena)) return arena;

    const heroAbility = heroAbilityBuilder.buildFor(hero.right);
    if (heroAbility.cannot('join', subject('Arena', arena.right))) {
      return left(errorFactory.forbidden());
    }

    const position = {
      x: randomInt(arena.right.size),
      y: randomInt(arena.right.size)
    };
    return await arenaRepo.join({ arenaId, heroId, position });
  };
