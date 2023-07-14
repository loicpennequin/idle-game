import { ArenaResponse } from '@daria/shared';
import { Arena } from './arena.entity';

export type ArenaMapper = {
  toResponse(arena: Arena): ArenaResponse;
  toResponseArray(arenas: Arena[]): ArenaResponse[];
};

export const arenaMapper = (): ArenaMapper => {
  const mapArena = (arena: Arena): ArenaResponse => {
    return {
      id: arena.id
    };
  };

  return {
    toResponse: mapArena,
    toResponseArray(arenas) {
      return arenas.map(mapArena);
    }
  };
};
