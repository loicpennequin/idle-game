import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { todoRouter } from '../todo/todo.router';
import { RequestScopedContainer } from '../../container';

declare module '@ts-rest/express' {
  interface TsRestRequest {
    container: RequestScopedContainer['cradle'];
  }
}

const s = initServer();

export const router = s.router(contract, {
  todo: todoRouter
});
