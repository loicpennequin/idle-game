import { asFunction } from 'awilix';
import { createTodoKeys } from './utils/todo.keys';
import { todoRepository } from './api/todo.repository';

export const todoProviders = {
  todoKeys: asFunction(createTodoKeys),
  todoRepo: asFunction(todoRepository)
};
