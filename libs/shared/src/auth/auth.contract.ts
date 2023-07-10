import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { z } from 'zod';
import { LoginResponse } from './auth.schemas';

const c = initContract();

export const todoContract = c.router(
  {
    login: {
      method: 'POST',
      path: '/auth/login',
      responses: {
        200: LoginResponse,
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

export type TodoContract = typeof todoContract;
