import { asFunction } from 'awilix';
import { heroMapper } from './hero.mapper';
import { heroRepository } from './hero.repository';
import { getAllHerosUseCase } from './usecases/getallHeros.usecase';

export const heroProviders = {
  heroRepo: asFunction(heroRepository),
  heroMapper: asFunction(heroMapper),

  getAllHerosUseCase: asFunction(getAllHerosUseCase)
};
