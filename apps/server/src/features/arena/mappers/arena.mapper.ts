import { ArenaDetailsResponse, ArenaResponse } from '@daria/shared';
import { Arena, ArenaDetails } from '../entities/arena.entity';
import {
  Arena as PrismaArena,
  ArenaHero as PrismaArenaHero,
  Hero as PrismaHero,
  User as PrismaUser
} from '@prisma/client';
import { z } from 'zod';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/function';
import { UnexpectedError, errorFactory } from '../../../utils/errorFactory';
import { ArenaHeroMapper } from './arenaHero.mapper';

type ToDomainInput = PrismaArena & { heroes: PrismaArenaHero[] };
type ToDetailsAggregateInput = PrismaArena & {
  heroes: (PrismaArenaHero & { hero: PrismaHero & { owner: PrismaUser } })[];
};

export type ArenaMapper = {
  toResponse(arena: Arena): ArenaResponse;
  toResponseArray(arenas: Arena[]): ArenaResponse[];
  toDetailsResponse(arena: ArenaDetails): ArenaDetailsResponse;
  toDomain(arena: ToDomainInput): E.Either<UnexpectedError, Arena>;
  //prettier-ignore
  toDetailsAggregate(arena: ToDetailsAggregateInput): E.Either<UnexpectedError, ArenaDetails>;
};

const heroStatSchema = z.object({
  position: z.object({
    x: z.number().positive().int(),
    y: z.number().positive().int()
  })
});

type Dependencies = { arenaHeroMapper: ArenaHeroMapper };
export const arenaMapper = ({ arenaHeroMapper }: Dependencies): ArenaMapper => {
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

  const toDomainBase = (arena: ToDomainInput): Omit<Arena, 'heroes'> => ({
    id: arena.id,
    name: arena.name,
    maxSlots: arena.maxSlots,
    size: arena.size,
    minLevel: arena.minLevel,
    maxLevel: arena.maxLevel
  });

  return {
    toResponse,

    toResponseArray(arenas) {
      return arenas.map(toResponse);
    },

    toDetailsResponse(arena) {
      return {
        ...toResponse(arena),
        heroes: arena.heroes.map(arenaHeroMapper.toResponse)
      };
    },

    toDomain: E.tryCatchK(
      arena => ({
        ...toDomainBase(arena),
        heroes: arena.heroes.map(arenaHero => ({
          id: arenaHero.id,
          joinedAt: arenaHero.joinedAt,
          arenaId: arenaHero.arenaId,
          heroId: arenaHero.heroId,
          stats: heroStatSchema.parse(arenaHero.stats)
        }))
      }),
      err => errorFactory.unexpected({ cause: new Error(String(err)) })
    ),

    toDetailsAggregate(arena) {
      return pipe(
        E.Do,
        E.apS('heroes', pipe(arena.heroes, arenaHeroMapper.toDetailsAggregate)),
        E.map(({ heroes }) => ({
          ...toDomainBase(arena),
          heroes
        }))
      );
    }
  };
};
