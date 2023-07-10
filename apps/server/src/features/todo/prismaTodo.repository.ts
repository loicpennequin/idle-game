import { PrismaClient } from '@prisma/client';
import { UUID } from '@daria/shared';
import { Todo } from './todo.entity';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { pipe, flow } from 'fp-ts/function';
import { handlePrismaNotFound, handlePrismaUnexpected } from '../../utils/prisma';
import { NotFoundError, UnexpectedError, errorFactory } from '../../utils/errorFactory';

export type TodoRepository = {
  findAll(): TE.TaskEither<UnexpectedError, Todo[]>;
  findById(id: UUID): TE.TaskEither<UnexpectedError | NotFoundError, Todo>;
  create({ text }: { text: string }): TE.TaskEither<UnexpectedError, Todo>;
  updateCompletedById(
    id: UUID,
    completed: boolean
  ): TE.TaskEither<UnexpectedError | NotFoundError, Todo>;
};

export const prismaTodoRepository = ({
  prisma
}: {
  prisma: PrismaClient;
}): TodoRepository => {
  return {
    create: TE.tryCatchK(
      ({ text }) =>
        prisma.todo.create({
          data: { text, completed: false }
        }),
      handlePrismaUnexpected
    ),

    findById: id =>
      pipe(
        id,
        TE.tryCatchK(
          id => prisma.todo.findUnique({ where: { id } }),
          err => pipe(err, handlePrismaUnexpected)
        ),
        TE.matchEW(TE.left, TE.fromNullable(errorFactory.notFound()))
      ),

    findAll: TE.tryCatchK(() => prisma.todo.findMany(), handlePrismaUnexpected),

    updateCompletedById: TE.tryCatchK(
      (id, completed) =>
        prisma.todo.update({
          where: { id },
          data: { completed }
        }),
      err => pipe(err, handlePrismaNotFound, handlePrismaUnexpected)
    )
  };
};
