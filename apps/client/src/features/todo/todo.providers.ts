import { asFunction } from 'awilix';
import { createTodoKeys } from './utils/todo.keys';
import { todoRepository } from './api/todo.repository';
import { todoSubscriber } from './api/todo.subscriber';

export const todoProviders = {
  todoKeys: asFunction(createTodoKeys),
  todoRepo: asFunction(todoRepository),
  todoSubscriber: asFunction(todoSubscriber)
};
