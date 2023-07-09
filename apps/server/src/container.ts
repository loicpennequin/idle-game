import { Express } from 'express';
import { asValue, asFunction } from 'awilix';
import { TypedAwilixContainer, createTypedContainer } from './utils/di';
import { config } from './config';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';
import { getAllTodosUseCase } from './features/todo/usecases/getallTodos.usecase';
import { getTodoUseCase } from './features/todo/usecases/getTodo.usecase';
import { createTodoUseCase } from './features/todo/usecases/createTodo.usecase';
import { prisma } from './features/core/prisma';
import { prismaTodoRepository } from './features/todo/repository/prismaTodo.repository';
import { todoMapper } from './features/todo/mappers/todo.mapper';
import { errorMapper } from './features/core/mappers/error.mapper';
import { requestScopeMiddleware } from './features/core/middlewares/requestScope.middleware';
import { createApp } from './app';
import { server } from './server';

const dependencies = {
  server: asFunction(server),
  app: asFunction(createApp),
  config: asValue(config),
  corsMiddleware: asFunction(corsMiddleware),
  requestScopeMiddleware: asValue(requestScopeMiddleware),

  prisma: asValue(prisma),
  req: asValue(null),
  res: asValue(null),

  todoRepo: asFunction(prismaTodoRepository),

  todoMapper: asFunction(todoMapper),
  errorMapper: asFunction(errorMapper),

  getAllTodosUseCase: asFunction(getAllTodosUseCase),
  getTodoUseCase: asFunction(getTodoUseCase),
  createTodoUseCase: asFunction(createTodoUseCase)
};

export const container = createTypedContainer(dependencies);

export type Container = typeof container;
export type RequestScopedContainer = TypedAwilixContainer<
  typeof dependencies & {
    req: Express['request'];
    res: Express['response'];
  }
>;
