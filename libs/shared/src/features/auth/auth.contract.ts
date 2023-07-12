import { initContract } from '@ts-rest/core';
import { DefaultResponse, ErrorResponse } from '../core';
import { z } from 'zod';
import { TokenResponse } from './auth.schemas';

const c = initContract();

export const authContract = c.router(
  {
    login: {
      method: 'POST',
      path: '/login',
      responses: {
        200: TokenResponse,
        401: ErrorResponse,
        500: ErrorResponse
      },
      body: z.object({
        email: z.string(),
        password: z.string()
      })
    },
    logout: {
      method: 'POST',
      path: '/logout',
      responses: {
        200: DefaultResponse,
        500: ErrorResponse
      },
      body: null
    },
    refresh: {
      method: 'POST',
      path: '/refresh',
      responses: {
        200: TokenResponse,
        401: ErrorResponse,
        500: ErrorResponse
      },
      body: null
    }
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/auth'
  }
);

export type AuthContract = typeof authContract;
