import { asFunction } from 'awilix';
import { heroApi } from './api/hero.api';

export const heroProviders = {
  heroApi: asFunction(heroApi)
};
