import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { z } from 'zod';
import { UserResponse } from './user.schemas';
import { HeroResponse } from '../hero';

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
    },
    updateProfile: {
      method: 'PATCH',
      path: '/:userId/profile',
      body: z.object({
        name: z.string()
      }),
      responses: {
        200: UserResponse,
        400: ErrorResponse,
        404: ErrorResponse,
        403: ErrorResponse,
        500: ErrorResponse
      }
    },
    userHeroes: {
      method: 'GET',
      path: '/:userId/heroes',
      responses: {
        200: HeroResponse.array(),
        404: ErrorResponse,
        500: ErrorResponse
      }
    }
  },
  {
    strictStatusCodes: true,
    pathPrefix: '/users'
  }
);

export type UserContract = typeof userContract;
