import { initContract } from '@ts-rest/core';
import { todoContract } from './features/todo';
import { userContract } from './features/user/user.contract';
import { authContract } from './features/auth/auth.contract';

const c = initContract();

export const contract = c.router(
  {
    todo: todoContract,
    user: userContract,
    auth: authContract
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/api'
  }
);

export type Contract = typeof contract;
