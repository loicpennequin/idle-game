import { HeroResponse } from '@daria/shared';
import { Hero } from './hero.entity';
import { Hero as PrismaHero, User as PrismaUser } from '@prisma/client';
import * as E from 'fp-ts/Either';
import { UnexpectedError, errorFactory } from '../../utils/errorFactory';

export type HeroMapper = {
  toResponse(hero: Hero): HeroResponse;
  toResponseArray(heros: Hero[]): HeroResponse[];
  toDomain(hero: PrismaHero & { owner: PrismaUser }): E.Either<UnexpectedError, Hero>;
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
    },

    toDomain: E.tryCatchK(
      hero => ({
        id: hero.id,
        name: hero.name,
        owner: hero.owner,
        level: hero.level
      }),
      err => errorFactory.unexpected({ cause: new Error(String(err)) })
    )
  };
};
