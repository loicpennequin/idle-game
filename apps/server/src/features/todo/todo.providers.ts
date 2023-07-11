import { asFunction } from 'awilix';
import { todoMapper } from './todo.mapper';
import { todoRepository } from './todo.repository';
import { createTodoUseCase } from './usecases/createTodo.usecase';
import { getTodoUseCase } from './usecases/getTodo.usecase';
import { getAllTodosUseCase } from './usecases/getallTodos.usecase';
import { toggleTodoUseCase } from './usecases/toggleTodo.usercase';

export const todoProviders = {
  todoRepo: asFunction(todoRepository),
  todoMapper: asFunction(todoMapper),

  getAllTodosUseCase: asFunction(getAllTodosUseCase),
  getTodoUseCase: asFunction(getTodoUseCase),
  createTodoUseCase: asFunction(createTodoUseCase),
  toggleTodoUseCase: asFunction(toggleTodoUseCase)
};
