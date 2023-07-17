import { Override, UUID } from '@daria/shared';
import { ArenaHero, ArenaHeroDetails } from './arenaHero.entity';

export type ArenaId = UUID;

export type Arena = {
  id: ArenaId;
  name: string;
  maxSlots: number;
  heroes: ArenaHero[];
  size: number;
  minLevel: number;
  maxLevel: number;
};

export type ArenaDetails = Override<Arena, { heroes: ArenaHeroDetails[] }>;
