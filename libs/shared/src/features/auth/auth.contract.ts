import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { z } from 'zod';
import { TokenResponse } from './auth.schemas';

const c = initContract();

export const authContract = c.router(
  {
    login: {
      method: 'POST',
      path: '/auth/login',
      responses: {
        200: TokenResponse,
        401: ErrorResponse,
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

export type AuthContract = typeof authContract;
