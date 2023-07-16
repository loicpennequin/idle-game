import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import { NotFoundError, UnexpectedError } from '../../utils/errorFactory';
import { Hero } from './hero.entity';
import { handlePrismaError, prismaNotFoundMatchers } from '../../utils/prisma';
import { UUID } from '@daria/shared';
import { UserId } from '../user/user.entity';

export type CreateHeroInput = {
  name: string;
  level: number;
  ownerId: UserId;
};

export type HeroRepository = {
  findAll(): Promise<E.Either<UnexpectedError, Hero[]>>;
  findById(id: UUID): Promise<E.Either<UnexpectedError | NotFoundError, Hero>>;
  create(data: {
    name: string;
    level: number;
    ownerId: UserId;
  }): Promise<E.Either<UnexpectedError, Hero>>;
};

export const heroRepository = ({ prisma }: { prisma: PrismaClient }): HeroRepository => {
  return {
    async findAll() {
      try {
        const heroes = await prisma.hero.findMany({ include: { owner: true } });

        return E.right(heroes);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async findById(id) {
      try {
        const hero = await prisma.hero.findUniqueOrThrow({
          where: { id },
          include: { owner: true }
        });

        return E.right(hero);
      } catch (err) {
        return E.left(handlePrismaError(prismaNotFoundMatchers)(err));
      }
    },

    async create(data) {
      try {
        const hero = await prisma.hero.create({
          data,
          include: { owner: true }
        });

        return E.right(hero);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    }
  };
};
