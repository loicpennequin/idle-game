import { PrismaClient } from '@prisma/client';
import { UUID } from '@daria/shared';
import { Todo } from './todo.entity';
import * as E from 'fp-ts/Either';
import { handlePrismaError, prismaNotFoundMatchers } from '../../utils/prisma';
import { NotFoundError, UnexpectedError, errorFactory } from '../../utils/errorFactory';

export type TodoRepository = {
  findAll(): Promise<E.Either<UnexpectedError, Todo[]>>;
  findById(id: UUID): Promise<E.Either<UnexpectedError | NotFoundError, Todo>>;
  create(data: { text: string }): Promise<E.Either<UnexpectedError, Todo>>;
  updateCompletedById(
    id: UUID,
    completed: boolean
  ): Promise<E.Either<UnexpectedError | NotFoundError, Todo>>;
};

export const todoRepository = ({ prisma }: { prisma: PrismaClient }): TodoRepository => {
  return {
    async create({ text }) {
      try {
        const todo = await prisma.todo.create({
          data: { text, completed: false }
        });

        return E.right(todo);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async findById(id) {
      try {
        const todo = await prisma.todo.findUnique({ where: { id } });

        return E.fromNullable(errorFactory.notFound)(todo);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async findAll() {
      try {
        const todos = await prisma.todo.findMany();

        return E.right(todos);
      } catch (err) {
        return E.left(handlePrismaError()(err));
      }
    },

    async updateCompletedById(id, completed) {
      try {
        const todo = await prisma.todo.update({
          where: { id },
          data: { completed }
        });

        return E.right(todo);
      } catch (err) {
        return E.left(handlePrismaError(prismaNotFoundMatchers)(err));
      }
    }
  };
};
