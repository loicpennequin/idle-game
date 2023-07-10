import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { todoRouter } from '../todo/todo.router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Express {
  export interface Request {
    tenant: string;
  }
}
const s = initServer();

export const router = s.router(contract, {
  todo: todoRouter
});
