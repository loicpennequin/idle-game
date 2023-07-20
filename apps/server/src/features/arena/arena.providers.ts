import { Lifetime, asFunction } from 'awilix';
import { arenaMapper } from './mappers/arena.mapper';
import { arenaRepository } from './arena.repository';
import { getAllArenasUseCase } from './usecases/getAllArenas.usecase';
import { joinArenaUseCase } from './usecases/joinArena.usecase';
import { leaveArenaUseCase } from './usecases/leaveArenaUsecase';
import { getArenaDetailsUseCase } from './usecases/getArenaDetails.usecase';
import { arenaHeroMapper } from './mappers/arenaHero.mapper';
import { arenaInitializer } from './arena.initializer';

export const arenaProviders = {
  arenaRepo: asFunction(arenaRepository),

  arenaMapper: asFunction(arenaMapper),
  arenaHeroMapper: asFunction(arenaHeroMapper),

  arenaInitializer: asFunction(arenaInitializer, { lifetime: Lifetime.SINGLETON }),

  getAllArenasUseCase: asFunction(getAllArenasUseCase),
  getArenaDetailsUseCase: asFunction(getArenaDetailsUseCase),
  joinArenaUseCase: asFunction(joinArenaUseCase),
  leaveArenaUseCase: asFunction(leaveArenaUseCase)
};
