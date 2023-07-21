import type { ArenaDetailsResponse } from '../arena';
import type { UUID } from './core.types';

export type IoEvents = {
  HERO_JOINED_ARENA(hero: ArenaDetailsResponse['heroes'][number]): void;
  HERO_LEFT_ARENA(payload: { arenaId: UUID; heroId: UUID }): void;
};
