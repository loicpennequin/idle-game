import { TodoResponse } from '@daria/shared';
import { Todo } from './entities/todo.entity';

export type TodoMapper = {
  toResponse(todo: Todo): TodoResponse;
  toResponseArray(todo: Todo[]): TodoResponse[];
};

export const todoMapper = (): TodoMapper => {
  const mapTodo = (todo: Todo): TodoResponse => {
    return {
      id: todo.id,
      text: todo.text,
      completed: todo.completed
    };
  };

  return {
    toResponse: mapTodo,
    toResponseArray(todos) {
      return todos.map(mapTodo);
    }
  };
};
