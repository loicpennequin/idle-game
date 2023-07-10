import { asFunction } from 'awilix';
import { createTodoKeys } from './utils/todo.keys';
import { todoRepository } from './api/todo.repository';
import { todoSubscriber } from './api/todo.subscriber';
import { todoApi } from './api/todo.api';

export const todoProviders = {
  todoKeys: asFunction(createTodoKeys),
  todoRepo: asFunction(todoRepository),
  todoSubscriber: asFunction(todoSubscriber),
  todoApi: asFunction(todoApi)
};
