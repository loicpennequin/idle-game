import { PrismaClient } from '@prisma/client';
import { UUID } from '@daria/shared';
import { Todo } from './todo.entity';
import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { handlePrismaError, prismaNotFoundMatchers } from '../../utils/prisma';
import { NotFoundError, UnexpectedError, errorFactory } from '../../utils/errorFactory';

export type TodoRepository = {
  findAll(): TE.TaskEither<UnexpectedError, Todo[]>;
  findById(id: UUID): TE.TaskEither<UnexpectedError | NotFoundError, Todo>;
  create(data: { text: string }): TE.TaskEither<UnexpectedError, Todo>;
  updateCompletedById(
    id: UUID,
    completed: boolean
  ): TE.TaskEither<UnexpectedError | NotFoundError, Todo>;
};

export const todoRepository = ({ prisma }: { prisma: PrismaClient }): TodoRepository => {
  return {
    create: TE.tryCatchK(
      ({ text }) =>
        prisma.todo.create({
          data: { text, completed: false }
        }),
      handlePrismaError({})
    ),

    findById: id =>
      pipe(
        id,
        TE.tryCatchK(
          id => prisma.todo.findUnique({ where: { id } }),
          handlePrismaError({})
        ),
        TE.matchEW(TE.left, TE.fromNullable(errorFactory.notFound()))
      ),

    findAll: TE.tryCatchK(() => prisma.todo.findMany(), handlePrismaError({})),

    updateCompletedById: TE.tryCatchK(
      (id, completed) =>
        prisma.todo.update({
          where: { id },
          data: { completed }
        }),
      handlePrismaError(prismaNotFoundMatchers)
    )
  };
};
