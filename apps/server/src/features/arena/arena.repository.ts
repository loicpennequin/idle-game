import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import { NotFoundError, UnexpectedError, errorFactory } from '../../utils/errorFactory';
import { Arena } from './arena.entity';
import { handlePrismaError, prismaNotFoundMatchers } from '../../utils/prisma';
import { UUID } from '@daria/shared';

export type ArenaRepository = {
  findAll(): Promise<E.Either<UnexpectedError, Arena[]>>;
  findById(id: UUID): Promise<E.Either<UnexpectedError | NotFoundError, Arena>>;
  join(arg: { arenaId: UUID; heroId: UUID }): Promise<E.Either<UnexpectedError, Arena>>;
  leave(arg: { arenaId: UUID; heroId: UUID }): Promise<E.Either<UnexpectedError, Arena>>;
};

export const arenaRepository = ({
  prisma
}: {
  prisma: PrismaClient;
}): ArenaRepository => {
  return {
    async findAll() {
      try {
        const arenas = await prisma.arena.findMany({
          include: { heroes: { include: { owner: true } } }
        });

        return E.right(arenas);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async findById(id) {
      try {
        const hero = await prisma.arena.findUniqueOrThrow({
          where: { id },
          include: { heroes: { include: { owner: true } } }
        });

        return E.right(hero);
      } catch (err) {
        return E.left(handlePrismaError(prismaNotFoundMatchers)(err));
      }
    },

    async join({ arenaId, heroId }) {
      try {
        const arena = await prisma.arena.update({
          where: { id: arenaId },
          include: { heroes: { include: { owner: true } } },
          data: {
            heroes: {
              connect: { id: heroId }
            }
          }
        });
        return E.right(arena);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async leave({ arenaId, heroId }) {
      try {
        const arena = await prisma.arena.update({
          where: { id: arenaId },
          include: { heroes: { include: { owner: true } } },
          data: {
            heroes: {
              delete: {
                id: heroId
              }
            }
          }
        });
        return E.right(arena);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    }
  };
};
