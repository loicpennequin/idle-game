import { NotFoundError, UnexpectedError } from '../../../utils/errorFactory';
import { Hero } from '../hero.entity';
import { HeroRepository } from '../hero.repository';
import { UseCase } from '../../../utils/helpers';
import { UserId } from '../../user/user.entity';
import { UserRepository } from '../../user/user.repository';
import * as E from 'fp-ts/Either';

export type GetUserHeroesUseCaseInput = UserId;

export type GetUserHeroesUseCase = UseCase<
  GetUserHeroesUseCaseInput,
  Hero[],
  UnexpectedError | NotFoundError
>;

type Dependencies = { heroRepo: HeroRepository; userRepo: UserRepository };

export const getUserHeroesUseCase =
  ({ heroRepo, userRepo }: Dependencies): GetUserHeroesUseCase =>
  async userId => {
    const userEither = await userRepo.findById(userId);
    if (E.isLeft(userEither)) return userEither;

    return heroRepo.findAllByOwnerId(userId);
  };
