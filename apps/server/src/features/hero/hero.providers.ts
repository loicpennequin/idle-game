import { asFunction } from 'awilix';
import { heroMapper } from './hero.mapper';
import { heroRepository } from './hero.repository';
import { getAllHerosUseCase } from './usecases/getAllHeros.usecase';
import { heroAbilityBuilder } from './hero.ability';

export const heroProviders = {
  heroRepo: asFunction(heroRepository),
  heroMapper: asFunction(heroMapper),
  heroAbility: asFunction(heroAbilityBuilder),

  getAllHerosUseCase: asFunction(getAllHerosUseCase)
};
