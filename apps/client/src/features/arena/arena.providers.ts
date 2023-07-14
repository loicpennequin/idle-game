import { asFunction } from 'awilix';
import { arenaApi } from './api/arena.api';

export const arenaProviders = {
  arenaApi: asFunction(arenaApi)
};
