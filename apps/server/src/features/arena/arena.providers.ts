import { asFunction } from 'awilix';
import { arenaMapper } from './arena.mapper';
import { arenaRepository } from './arena.repository';
import { getAllArenasUseCase } from './usecases/getAllArenas.usecase';
import { joinArenaUseCase } from './usecases/joinArena.usecase';
import { leaveArenaUseCase } from './usecases/leaveArenaUsecase';
import { getArenaDetailsUseCase } from './usecases/getArenaDetails.usecase';

export const arenaProviders = {
  arenaRepo: asFunction(arenaRepository),
  arenaMapper: asFunction(arenaMapper),

  getAllArenasUseCase: asFunction(getAllArenasUseCase),
  getArenaDetailsUseCase: asFunction(getArenaDetailsUseCase),
  joinArenaUseCase: asFunction(joinArenaUseCase),
  leaveArenaUseCase: asFunction(leaveArenaUseCase)
};
