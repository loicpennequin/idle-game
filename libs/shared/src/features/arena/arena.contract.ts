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
    },
    join: {
      method: 'POST',
      path: '/:arenaId/join',
      responses: {
        200: ArenaResponse,
        400: ErrorResponse,
        404: ErrorResponse,
        500: ErrorResponse
      },
      body: z.object({
        heroId: z.string()
      })
    },
    leave: {
      method: 'POST',
      path: '/:arenaId/leave',
      responses: {
        200: ArenaResponse,
        400: ErrorResponse,
        404: ErrorResponse,
        500: ErrorResponse
      },
      body: z.object({
        heroId: z.string()
      })
    }
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/arenas'
  }
);

export type ArenaContract = typeof arenaContract;