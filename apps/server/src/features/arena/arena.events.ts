import { HeroId } from '../hero/hero.entity';
import { ArenaId } from './entities/arena.entity';

export type ArenaEvents = {
  HERO_JOIND_ARENA: (payload: { arenaId: ArenaId; heroId: HeroId }) => void;
};
