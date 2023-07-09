import { PrismaClient } from '@prisma/client';
import { UUID } from '@daria/shared';
import { Todo } from './entities/todo.entity';
import { Nullable } from '@daria/shared';

export type TodoRepository = {
  findAll(): Promise<Todo[]>;
  findById(id: UUID): Promise<Nullable<Todo>>;
  create({ text }: { text: string }): Promise<Todo>;
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
    }
  };
};
