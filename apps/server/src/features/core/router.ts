import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { todoRouter } from '../todo/todo.router';
import { RequestScopedContainer } from '../../container';

declare module '@ts-rest/express' {
  interface TsRestRequest {
    container: RequestScopedContainer['cradle'];
  }
}

export const createRouter = () => {
  const s = initServer();

  return s.router(contract, {
    todo: todoRouter
  });
};

export type Router = ReturnType<ReturnType<typeof initServer>['router']>;
