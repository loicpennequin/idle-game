import type { ArenaDetailsResponse } from '../arena';

export type IoEvents = {
  HERO_JOINED_ARENA(hero: ArenaDetailsResponse['heroes'][number]): void;
};
