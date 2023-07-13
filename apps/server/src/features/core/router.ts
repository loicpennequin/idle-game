import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { todoRouter } from '../todo/todo.router';
import { userRouter } from '../user/user.router';
import { authRouter } from '../auth/auth.router';

const s = initServer();

export const router = s.router(contract, {
  todo: todoRouter,
  user: userRouter,
  auth: authRouter
});
