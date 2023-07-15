import { UnexpectedError } from '../../../utils/errorFactory';
import { Hero } from '../hero.entity';
import { HeroRepository } from '../hero.repository';
import { UseCase } from '../../../utils/helpers';

export type GetAllHeroError = UnexpectedError;

export type GetAllHerosUseCase = UseCase<void, Hero[], GetAllHeroError>;

type Dependencies = { heroRepo: HeroRepository };

export const getAllHerosUseCase =
  ({ heroRepo }: Dependencies): GetAllHerosUseCase =>
  async () => {
    return heroRepo.findAll();
  };
