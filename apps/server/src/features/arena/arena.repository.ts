import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import { UnexpectedError, errorFactory } from '../../utils/errorFactory';
import { Arena } from './arena.entity';
import { handlePrismaError } from '../../utils/prisma';

export type ArenaRepository = {
  findAll(): Promise<E.Either<UnexpectedError, Arena[]>>;
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
          include: { heroes: true }
        });

        return E.right(arenas);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    }
  };
};
