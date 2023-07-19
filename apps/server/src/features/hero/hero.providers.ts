import { asFunction } from 'awilix';
import { heroMapper } from './hero.mapper';
import { heroRepository } from './hero.repository';
import { getAllHerosUseCase } from './usecases/getAllHeros.usecase';
import { heroAbilityBuilder } from './hero.ability';
import { getUserHeroesUseCase } from './usecases/getUserHeroes.usecase';

export const heroProviders = {
  heroRepo: asFunction(heroRepository),
  heroMapper: asFunction(heroMapper),
  heroAbilityBuilder: asFunction(heroAbilityBuilder),

  getAllHerosUseCase: asFunction(getAllHerosUseCase),
  getUserHeroesUseCase: asFunction(getUserHeroesUseCase)
};
