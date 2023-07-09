import { Prisma, PrismaClient } from '@prisma/client';
import { UUID } from '@daria/shared';
import { Todo } from './entities/todo.entity';
import { Nullable } from '@daria/shared';
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

    findById(id) {
      return prisma.todo.findUnique({ where: { id } });
    },

    findAll() {
      return prisma.todo.findMany();
    },

    async updateCompletedById(id, completed) {
      try {
        return await prisma.todo.update({
          where: { id },
          data: { completed }
        });
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code === 'P2025') throw errorFactory.notFound();
        }

        throw err;
      }
    }
  };
};
