import { Prisma, PrismaClient } from '@prisma/client';
import { Nullable, UUID } from '@daria/shared';
import { PrismaError } from 'prisma-error-enum';
import { Todo } from './todo.entity';
import * as O from 'fp-ts/Option';
import { errorFactory } from '../../utils/errorFactory';

export type TodoRepository = {
  findAll(): Promise<Todo[]>;
  findById(id: UUID): Promise<Nullable<Todo>>;
  create({ text }: { text: string }): Promise<Todo>;
  updateCompletedById(id: UUID, completed: boolean): Promise<Nullable<Todo>>;
};

export const prismaTodoRepository = ({
  prisma
}: {
  prisma: PrismaClient;
}): TodoRepository => {
  return {
    create({ text }) {
      return prisma.todo.create({
        data: { text, completed: false }
      });
    },

    async findById(id) {
      const todo = await prisma.todo.findUnique({ where: { id } });
      return todo;
    },

    findAll() {
      return prisma.todo.findMany();
    },

    async updateCompletedById(id, completed) {
      try {
        const todo = await prisma.todo.update({
          where: { id },
          data: { completed }
        });

        return todo;
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === PrismaError.RecordsNotFound) {
            throw errorFactory.notFound();
          }
        }

        throw err;
      }
    }
  };
};
