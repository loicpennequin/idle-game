import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { TodoResponse } from './todo.schemas';
import { z } from 'zod';

const c = initContract();

export const todoContract = c.router({
  create: {
    method: 'POST',
    path: '/todos',
    responses: {
      201: TodoResponse,
      400: ErrorResponse,
      500: ErrorResponse
    },
    body: z.object({
      text: z.string()
    })
  },
  getById: {
    method: 'GET',
    path: `/todos/:id`,
    responses: {
      200: TodoResponse,
      404: ErrorResponse,
      500: ErrorResponse
    }
  },
  getAll: {
    method: 'GET',
    path: `/todos`,
    responses: {
      200: TodoResponse.array(),
      500: ErrorResponse
    }
  },
  updateCompleted: {
    method: 'POST',
    path: '/todos/:id/toggle',
    responses: {
      200: TodoResponse,
      404: ErrorResponse,
      500: ErrorResponse
    },
    body: z.object({
      completed: z.boolean()
    })
  }
});

export type TodoContract = typeof todoContract;
