import type { TodoRepository } from './todo.repository';
import type { TodoSubscriber } from './todo.subscriber';

export type TodoApi = TodoRepository & TodoSubscriber;

export const todoApi = ({
  todoRepo,
  todoSubscriber
}: {
  todoRepo: TodoRepository;
  todoSubscriber: TodoSubscriber;
}): TodoApi => {
  return {
    ...todoRepo,
    ...todoSubscriber
  };
};
