import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { NotFoundError, UnexpectedError, errorFactory } from '../../utils/errorFactory';
import { Arena, ArenaDetails } from './entities/arena.entity';
import { handlePrismaError, prismaNotFoundMatchers } from '../../utils/prisma';
import { Point, UUID } from '@daria/shared';
import { ArenaMapper } from './arena.mapper';

export type ArenaRepository = {
  findAll(): Promise<E.Either<UnexpectedError, Arena[]>>;
  findById(id: UUID): Promise<E.Either<UnexpectedError | NotFoundError, Arena>>;
  findByIdWithDetails(id: UUID): Promise<E.Either<UnexpectedError, ArenaDetails>>;
  join(arg: {
    arenaId: UUID;
    heroId: UUID;
    position: Point;
  }): Promise<E.Either<UnexpectedError, Arena>>;
  leave(arg: { arenaId: UUID; heroId: UUID }): Promise<E.Either<UnexpectedError, Arena>>;
};

export const arenaRepository = ({
  prisma,
  arenaMapper
}: {
  prisma: PrismaClient;
  arenaMapper: ArenaMapper;
}): ArenaRepository => {
  return {
    async findAll() {
      try {
        const arenas = await prisma.arena.findMany({
          include: { heroes: true }
        });

        return pipe(
          arenas,
          A.map(arena => arenaMapper.toDomain(arena)),
          A.sequence(E.Applicative)
        );
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async findByIdWithDetails(id) {
      try {
        const arena = await prisma.arena.findUniqueOrThrow({
          where: { id },
          include: {
            heroes: {
              include: {
                hero: {
                  include: { owner: true }
                }
              }
            }
          }
        });

        return arenaMapper.toDetailsAggregate(arena);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async findById(id) {
      try {
        const arena = await prisma.arena.findUniqueOrThrow({
          where: { id },
          include: { heroes: true }
        });

        return arenaMapper.toDomain(arena);
      } catch (err) {
        return E.left(handlePrismaError(prismaNotFoundMatchers)(err));
      }
    },

    async join({ arenaId, heroId, position }) {
      try {
        const arena = await prisma.arena.update({
          where: { id: arenaId },
          include: { heroes: true },
          data: {
            heroes: {
              create: { heroId: heroId, stats: { position } }
            }
          }
        });

        return arenaMapper.toDomain(arena);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async leave({ arenaId, heroId }) {
      try {
        const arena = await prisma.arena.update({
          where: { id: arenaId },
          include: { heroes: true },
          data: {
            heroes: {
              delete: {
                heroId
              }
            }
          }
        });

        return arenaMapper.toDomain(arena);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    }
  };
};
