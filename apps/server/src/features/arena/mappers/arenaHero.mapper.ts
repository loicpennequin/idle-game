import { ArenaHeroResponse } from '@daria/shared';
import {
  Prisma,
  ArenaHero as PrismaArenaHero,
  Hero as PrismaHero,
  User as PrismaUser
} from '@prisma/client';
import { z } from 'zod';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { flow, pipe } from 'fp-ts/function';
import { HeroMapper } from '../../hero/hero.mapper';
import { UnexpectedError, errorFactory } from '../../../utils/errorFactory';
import { ArenaHero, ArenaHeroDetails } from '../entities/arenaHero.entity';

export type ArenaHeroMapper = {
  toResponse(arena: ArenaHeroDetails): ArenaHeroResponse;
  toDomain(arenaHeroes: PrismaArenaHero): E.Either<UnexpectedError, ArenaHero>;
  toDetailsAggregate(
    arenaHeroes: PrismaArenaHero & { hero: PrismaHero & { owner: PrismaUser } }
  ): E.Either<UnexpectedError, ArenaHeroDetails>;
};

const heroStatSchema = z.object({
  position: z.object({
    x: z.number().positive().int(),
    y: z.number().positive().int()
  })
});

export const arenaHeroMapper = ({
  heroMapper
}: {
  heroMapper: HeroMapper;
}): ArenaHeroMapper => {
  const getStats = E.tryCatchK(
    (stats: Prisma.JsonValue) => heroStatSchema.parse(stats),
    err => errorFactory.unexpected({ cause: new Error(String(err)) })
  );

  return {
    toResponse(arenaHero) {
      return {
        hero: heroMapper.toResponse(arenaHero.hero),
        id: arenaHero.id,
        arenaId: arenaHero.arenaId,
        joinedAt: arenaHero.joinedAt,
        position: arenaHero.stats.position
      };
    },

    toDomain(arenaHero) {
      return pipe(
        E.Do,
        E.bind('stats', () => getStats(arenaHero.stats)),
        E.map(({ stats }) => ({
          id: arenaHero.id,
          joinedAt: arenaHero.joinedAt,
          arenaId: arenaHero.arenaId,
          heroId: arenaHero.heroId,
          stats
        }))
      );
    },

    toDetailsAggregate(arenaHero) {
      return pipe(
        E.Do,
        E.bind('stats', () => getStats(arenaHero.stats)),
        E.bind('hero', () => heroMapper.toDomain(arenaHero.hero)),
        E.map(({ stats, hero }) => ({
          id: arenaHero.id,
          joinedAt: arenaHero.joinedAt,
          arenaId: arenaHero.arenaId,
          heroId: arenaHero.heroId,
          stats,
          hero
        }))
      );
    }
  };
};
