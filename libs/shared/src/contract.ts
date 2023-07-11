import { initContract } from '@ts-rest/core';
import { todoContract } from './features/todo';

const c = initContract();

export const contract = c.router(
  {
    todo: todoContract
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/api'
  }
);

export type Contract = typeof contract;
