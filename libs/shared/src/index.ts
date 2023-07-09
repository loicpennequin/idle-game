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
export * from './utils/assertions';
export * from './utils/helpers';
export * from './utils/constants';
export * from './utils/either';

export * from './todo';
export * from './core';
