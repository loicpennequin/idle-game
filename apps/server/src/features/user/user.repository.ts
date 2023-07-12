import { PrismaClient } from '@prisma/client';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { handlePrismaError, prismaNotUniqueMatchers } from '../../utils/prisma';
import {
  BadRequestError,
  NotFoundError,
  UnexpectedError,
  errorFactory
} from '../../utils/errorFactory';
import { User } from './user.entity';
import { UUID } from '@daria/shared';

export type UserRepository = {
  create(data: {
    email: string;
    passwordHash: string;
  }): Promise<E.Either<UnexpectedError | BadRequestError, User>>;
  findById(id: UUID): Promise<E.Either<UnexpectedError | NotFoundError, User>>;
  findByEmail(email: string): Promise<E.Either<UnexpectedError | NotFoundError, User>>;
};

export const userRepository = ({ prisma }: { prisma: PrismaClient }): UserRepository => {
  return {
    async create(data) {
      try {
        const todo = await prisma.user.create({
          data
        });

        return E.right(todo);
      } catch (err) {
        return E.left(handlePrismaError(prismaNotUniqueMatchers)(err));
      }
    },

    async findById(id) {
      try {
        const todo = await prisma.user.findUnique({ where: { id } });

        return E.fromNullable(errorFactory.notFound)(todo);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async findByEmail(email) {
      try {
        const todo = await prisma.user.findUnique({ where: { email } });

        return E.fromNullable(errorFactory.notFound)(todo);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    }
  };
};
