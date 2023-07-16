import { UUID } from '@daria/shared';
import { Hero } from '../hero/hero.entity';

export type ArenaId = UUID;

export type Arena = {
  id: ArenaId;
  name: string;
  maxSlots: number;
  heroes: Hero[];
  size: number;
  minLevel: number;
  maxLevel: number;
};
