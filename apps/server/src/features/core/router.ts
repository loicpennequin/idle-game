import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { Container } from './interfaces/container';
import { todoRouter } from '../todo/todo.router';

declare module '@ts-rest/express' {
  interface TsRestRequest {
    container: Container['cradle'];
  }
}

const s = initServer();

export const router = s.router(contract, {
  todo: todoRouter
});
