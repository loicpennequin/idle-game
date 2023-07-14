import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import { UnexpectedError, errorFactory } from '../../utils/errorFactory';
import { Hero } from './hero.entity';

export type HeroRepository = {
  findAll(): Promise<E.Either<UnexpectedError, Hero[]>>;
};

export const heroRepository = ({ prisma }: { prisma: PrismaClient }): HeroRepository => {
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
