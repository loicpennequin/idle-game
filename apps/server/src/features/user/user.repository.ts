import { PrismaClient } from '@prisma/client';
import { userContract } from '@daria/shared';
import * as TE from 'fp-ts/TaskEither';
import { handlePrismaError, prismaNotUniqueMatchers } from '../../utils/prisma';
import { BadRequestError, UnexpectedError } from '../../utils/errorFactory';
import { ServerInferRequest } from '@ts-rest/core';
import { User } from './user.entity';

export type UserRepository = {
  create(data: {
    email: string;
    passwordHash: string;
  }): TE.TaskEither<UnexpectedError | BadRequestError, User>;
};

export const userRepository = ({ prisma }: { prisma: PrismaClient }): UserRepository => {
  return {
    create: TE.tryCatchK(
      input =>
        prisma.user.create({
          data: input
        }),
      handlePrismaError(prismaNotUniqueMatchers)
    )
  };
};
