import { ArenaDetailsResponse, ArenaResponse } from '@daria/shared';
import { Arena, ArenaDetails } from './entities/arena.entity';
import {
  Arena as PrismaArena,
  ArenaHero as PrismaArenaHero,
  Hero as PrismaHero,
  User as PrismaUser
} from '@prisma/client';
import { z } from 'zod';
import { Either, left, right } from 'fp-ts/Either';
import { HeroMapper } from '../hero/hero.mapper';
import { UnexpectedError, errorFactory } from '../../utils/errorFactory';

export type ArenaMapper = {
  toResponse(arena: Arena): ArenaResponse;
  toResponseArray(arenas: Arena[]): ArenaResponse[];
  toDetailsResponse(arena: ArenaDetails): ArenaDetailsResponse;
  toDomain(
    arena: PrismaArena & { heroes: PrismaArenaHero[] }
  ): Either<UnexpectedError, Arena>;
  toDetailsAggregate(
    arena: PrismaArena & {
      heroes: (PrismaArenaHero & { hero: PrismaHero & { owner: PrismaUser } })[];
    }
  ): Either<UnexpectedError, ArenaDetails>;
};

const heroStatSchema = z.object({
  position: z.object({
    x: z.number().positive().int(),
    y: z.number().positive().int()
  })
});

export const arenaMapper = ({ heroMapper }: { heroMapper: HeroMapper }): ArenaMapper => {
  const toResponse = (arena: Arena): ArenaResponse => {
    return {
      id: arena.id,
      name: arena.name,
      maxSlots: arena.maxSlots,
      availableSlots: arena.maxSlots - arena.heroes.length,
      size: arena.size,
      minLevel: arena.minLevel,
      maxLevel: arena.maxLevel
    };
  };

  return {
    toResponse,

    toResponseArray(arenas) {
      return arenas.map(toResponse);
    },

    toDetailsResponse(arena) {
      return {
        id: arena.id,
        name: arena.name,
        maxSlots: arena.maxSlots,
        availableSlots: arena.maxSlots - arena.heroes.length,
        size: arena.size,
        minLevel: arena.minLevel,
        maxLevel: arena.maxLevel,
        heroes: arena.heroes.map(arenaHero => ({
          hero: heroMapper.toResponse(arenaHero.hero),
          id: arenaHero.id,
          arenaId: arenaHero.arenaId,
          joinedAt: arenaHero.joinedAt,
          position: arenaHero.stats.position
        }))
      };
    },

    toDomain(arena) {
      try {
        return right({
          id: arena.id,
          name: arena.name,
          maxSlots: arena.maxSlots,
          size: arena.size,
          minLevel: arena.minLevel,
          maxLevel: arena.maxLevel,
          heroes: arena.heroes.map(arenaHero => ({
            id: arenaHero.id,
            joinedAt: arenaHero.joinedAt,
            arenaId: arenaHero.arenaId,
            heroId: arenaHero.heroId,
            stats: heroStatSchema.parse(arenaHero.stats)
          }))
        });
      } catch (err) {
        return left(
          errorFactory.unexpected({ cause: err instanceof Error ? err : undefined })
        );
      }
    },

    toDetailsAggregate(arena) {
      try {
        return right({
          id: arena.id,
          name: arena.name,
          maxSlots: arena.maxSlots,
          size: arena.size,
          minLevel: arena.minLevel,
          maxLevel: arena.maxLevel,
          heroes: arena.heroes.map(arenaHero => ({
            id: arenaHero.id,
            joinedAt: arenaHero.joinedAt,
            arenaId: arenaHero.arenaId,
            heroId: arenaHero.heroId,
            stats: heroStatSchema.parse(arenaHero.stats),
            hero: {
              id: arenaHero.hero.id,
              level: arenaHero.hero.level,
              name: arenaHero.hero.name,
              owner: arenaHero.hero.owner
            }
          }))
        });
      } catch (err) {
        return left(
          errorFactory.unexpected({ cause: err instanceof Error ? err : undefined })
        );
      }
    }
  };
};
