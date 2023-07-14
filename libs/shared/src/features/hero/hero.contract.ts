import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { HeroResponse } from './hero.schemas';
import { z } from 'zod';

const c = initContract();

export const heroContract = c.router(
  {
    getAll: {
      method: 'GET',
      path: '/',
      responses: {
        200: HeroResponse.array(),
        500: ErrorResponse
      }
    }
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/heros'
  }
);

export type HeroContract = typeof heroContract;
