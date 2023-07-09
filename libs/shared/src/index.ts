import { initContract } from '@ts-rest/core';
import { todoContract } from './todo';

const c = initContract();

export const contract = c.router(
  {
    todo: todoContract
  },
  {
    strictStatusCodes: true
  }
);

export type Contract = typeof contract;

export * from './types/utils';
export * from './utils';
export * from './todo';
export * from './core';
