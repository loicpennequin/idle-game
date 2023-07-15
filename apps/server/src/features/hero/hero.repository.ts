import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import { NotFoundError, UnexpectedError } from '../../utils/errorFactory';
import { Hero } from './hero.entity';
import { handlePrismaError, prismaNotFoundMatchers } from '../../utils/prisma';
import { UUID } from '@daria/shared';

export type HeroRepository = {
  findAll(): Promise<E.Either<UnexpectedError, Hero[]>>;
  findById(id: UUID): Promise<E.Either<UnexpectedError | NotFoundError, Hero>>;
};

export const heroRepository = ({ prisma }: { prisma: PrismaClient }): HeroRepository => {
  return {
    async findAll() {
      try {
        const heroes = await prisma.hero.findMany();

        return E.right(heroes);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async findById(id) {
      try {
        const hero = await prisma.hero.findUniqueOrThrow({
          where: { id }
        });

        return E.right(hero);
      } catch (err) {
        return E.left(handlePrismaError(prismaNotFoundMatchers)(err));
      }
    }
  };
};
