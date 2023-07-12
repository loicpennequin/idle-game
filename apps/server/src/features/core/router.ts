import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { todoRouter } from '../todo/todo.router';
import { userRouter } from '../user/user.router';
import { authRouter } from '../auth/auth.router';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Express {
  export interface Request {
    tenant: string;
  }
}
const s = initServer();

export const router = s.router(contract, {
  todo: todoRouter,
  user: userRouter
  // auth: authRouter
});
