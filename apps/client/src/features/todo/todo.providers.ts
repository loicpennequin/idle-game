import { asFunction } from 'awilix';
import { todoApi } from './api/todo.api';

export const todoProviders = {
  todoApi: asFunction(todoApi)
};
