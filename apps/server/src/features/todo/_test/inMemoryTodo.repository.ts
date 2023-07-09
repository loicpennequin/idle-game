import { nanoid } from 'nanoid';
import { TodoRepository } from '../interfaces/todoRepository.interface';
import { Todo } from '../entities/todo.entity';

export const testInMemoryTodoRepository = (todos: Todo[]): TodoRepository => {
  return {
    findAll() {
      return Promise.resolve(todos);
    },

    findById(id) {
      return Promise.resolve(todos.find(todo => todo.id === id));
    },

    create({ text }) {
      const newTodo = {
        id: nanoid(6),
        text,
        completed: false
      };
      todos.push(newTodo);

      return Promise.resolve(newTodo);
    }
  };
};
