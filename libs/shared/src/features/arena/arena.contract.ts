import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { ArenaDetailsResponse, ArenaResponse } from './arena.schemas';
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
      },
      metadata: { public: true }
    },
    getById: {
      method: 'GET',
      path: '/:arenaId',
      responses: {
        200: ArenaDetailsResponse,
        404: ErrorResponse,
        500: ErrorResponse
      },
      metadata: { public: true }
    },
    join: {
      method: 'POST',
      path: '/:arenaId/join',
      responses: {
        200: ArenaResponse,
        403: ErrorResponse,
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
        403: ErrorResponse,
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
