import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { ArenaResponse } from './arena.schemas';
import { z } from 'zod';

const c = initContract();

export const arenaContract = c.router(
  {
    getAll: {
      method: 'GET',
      path: '/',
      responses: {
        200: ArenaResponse.array(),
        500: ErrorResponse
      }
    }
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/arenas'
  }
);

export type ArenaContract = typeof arenaContract;
