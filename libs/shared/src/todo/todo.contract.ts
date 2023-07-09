import { initContract } from '@ts-rest/core';
import { ErrorResponse } from '../core';
import { CreateTodoDto, TodoResponse, UpdateTodoCompletedDto } from './todo.schemas';

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
    body: CreateTodoDto
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
    body: UpdateTodoCompletedDto
  }
});

export type TodoContract = typeof todoContract;
