/**
 *  THE CONTENT OF THIS FILE IS AUTOGENERATED BY THE CLI. DONT EDIT IT DIRECTLY
 *  If you need to edit the template, to to libs/cli/src/commands/feature.ts
 */
import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { authRouter } from '../auth/auth.router';
import { fooRouter } from '../foo/foo.router';
import { todoRouter } from '../todo/todo.router';
import { userRouter } from '../user/user.router';

const s = initServer();

export const router = s.router(contract, {
  auth: authRouter,
  foo: fooRouter,
  todo: todoRouter,
  user: userRouter
});
