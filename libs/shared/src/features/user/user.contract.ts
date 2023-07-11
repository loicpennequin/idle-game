import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { z } from 'zod';
import { UserResponse } from './user.schemas';

const c = initContract();

export const userContract = c.router(
  {
    login: {
      method: 'POST',
      path: '/user',
      responses: {
        200: UserResponse,
        400: ErrorResponse,
        500: ErrorResponse
      },
      body: z.object({
        text: z.string()
      })
    }
  },
  {
    strictStatusCodes: true
  }
);

export type UserContract = typeof userContract;
