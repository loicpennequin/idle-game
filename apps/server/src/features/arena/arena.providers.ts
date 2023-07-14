import { asFunction } from 'awilix';
import { arenaMapper } from './arena.mapper';
import { arenaRepository } from './arena.repository';
import { getAllArenasUseCase } from './usecases/getallArenas.usecase';

export const arenaProviders = {
  arenaRepo: asFunction(arenaRepository),
  arenaMapper: asFunction(arenaMapper),

  getAllArenasUseCase: asFunction(getAllArenasUseCase)
};
