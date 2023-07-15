import { HeroResponse } from '@daria/shared';
import { Hero } from './hero.entity';

export type HeroMapper = {
  toResponse(hero: Hero): HeroResponse;
  toResponseArray(heros: Hero[]): HeroResponse[];
};

export const heroMapper = (): HeroMapper => {
  const mapHero = (hero: Hero): HeroResponse => {
    return {
      id: hero.id,
      name: hero.name,
      owner: hero.owner,
      level: hero.level
    };
  };

  return {
    toResponse: mapHero,
    toResponseArray(heros) {
      return heros.map(mapHero);
    }
  };
};
