import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { z } from 'zod';
import { UserResponse } from './user.schemas';

const c = initContract();

export const userContract = c.router(
  {
    signup: {
      method: 'POST',
      path: '/',
      responses: {
        201: UserResponse,
        400: ErrorResponse,
        500: ErrorResponse
      },
      body: z.object({
        email: z.string().email(),
        password: z.string()
      })
    }
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/users'
  }
);

export type UserContract = typeof userContract;
