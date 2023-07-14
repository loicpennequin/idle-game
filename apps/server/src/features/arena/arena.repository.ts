import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import { UnexpectedError, errorFactory } from '../../utils/errorFactory';
import { Arena } from './arena.entity';

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
        throw errorFactory.unexpected({ message: 'not implemented' });
      } catch (err) {
        return E.left(handlePrismaError(prismaNotUniqueMatchers)(err));
      }
    }
  };
};
