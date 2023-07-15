import { ArenaResponse } from '@daria/shared';
import { Arena } from './arena.entity';

export type ArenaMapper = {
  toResponse(arena: Arena): ArenaResponse;
  toResponseArray(arenas: Arena[]): ArenaResponse[];
};

export const arenaMapper = (): ArenaMapper => {
  const toResponse = (arena: Arena): ArenaResponse => {
    return {
      id: arena.id,
      name: arena.name,
      maxSlots: arena.maxslots,
      availableSlots: arena.maxslots - arena.heroes.length,
      size: arena.size,
      minLevel: arena.minLevel,
      maxLevel: arena.maxLevel
    };
  };

  return {
    toResponse,
    toResponseArray(arenas) {
      return arenas.map(toResponse);
    }
  };
};
