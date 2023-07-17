import { Point, UUID } from '@daria/shared';
import { ArenaId } from './arena.entity';
import { Hero, HeroId } from '../../hero/hero.entity';

export type ArenaHeroId = UUID;

export type ArenaHeroStats = {
  position: Point;
};

export type ArenaHero = {
  id: ArenaHeroId;
  joinedAt: Date;
  stats: ArenaHeroStats;
  arenaId: ArenaId;
  heroId: HeroId;
};

export type ArenaHeroDetails = ArenaHero & {
  hero: Hero;
};
