import { UUID } from '@daria/shared';
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
import { HeroAbilityBuilder } from '../../hero/hero.ability';
import { UserAbilityBuilder } from '../../user/user.ability';
import { HeroRepository } from '../../hero/hero.repository';
import { User } from '../../user/user.entity';
import { subject } from '@casl/ability';

export type LeaveArenaUseCaseInput = {
  arenaId: UUID;
  heroId: UUID;
};

export type LeaveArenaUseCaseError = UnexpectedError | NotFoundError | ForbiddenError;

export type LeaveArenaUseCase = UseCase<
  LeaveArenaUseCaseInput,
  Arena,
  LeaveArenaUseCaseError
>;

type Dependencies = {
  arenaRepo: ArenaRepository;
  heroRepo: HeroRepository;
  heroAbilityBuilder: HeroAbilityBuilder;
  userAbilityBuilder: UserAbilityBuilder;
  session: User;
};

export const leaveArenaUseCase =
  ({
    arenaRepo,
    heroRepo,
    userAbilityBuilder,
    heroAbilityBuilder,
    session
  }: Dependencies): LeaveArenaUseCase =>
  async ({ arenaId, heroId }) => {
    const hero = await heroRepo.findById(heroId);
    if (isLeft(hero)) return hero;

    const userAbility = userAbilityBuilder.buildFor(session);
    if (userAbility.cannot('edit', subject('Hero', hero.right))) {
      return left(errorFactory.forbidden());
    }

    const arena = await arenaRepo.findById(arenaId);
    if (isLeft(arena)) {
      return arena;
    }

    const heroAbility = heroAbilityBuilder.buildFor(hero.right);
    if (heroAbility.cannot('leave', subject('Arena', arena.right))) {
      return left(errorFactory.forbidden());
    }

    return arenaRepo.leave({ arenaId, heroId });
  };
