import { todoContract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';
import { execute } from '../../utils/helpers';
import * as TE from 'fp-ts/TaskEither';

const s = initServer();

export const todoRouter = s.router(todoContract, {
  create: ({ body, req: { container } }) =>
    pipe(
      container.createTodoUseCase(body),
      TE.matchW(
        err => ({
          status: err.statusCode,
          body: container.errorMapper.toResponse(err)
        }),
        result => ({
          status: HTTP_STATUS_CODES.CREATED,
          body: container.todoMapper.toResponse(result)
        })
      ),
      execute
    ),

  getById: ({ params, req: { container } }) =>
    pipe(
      container.getTodoUseCase(params.id),
      TE.matchW(
        err => ({
          status: err.statusCode,
          body: container.errorMapper.toResponse(err)
        }),
        result => ({
          status: HTTP_STATUS_CODES.OK,
          body: container.todoMapper.toResponse(result)
        })
      ),
      execute
    ),

  getAll: ({ req: { container } }) =>
    pipe(
      container.getAllTodosUseCase(),
      TE.matchW(
        err => ({
          status: err.statusCode,
          body: container.errorMapper.toResponse(err)
        }),
        result => ({
          status: HTTP_STATUS_CODES.OK,
          body: container.todoMapper.toResponseArray(result)
        })
      ),
      execute
    ),

  updateCompleted: ({ params, body, req: { container } }) =>
    pipe(
      container.toggleTodoUseCase(params.id, body.completed),
      TE.matchW(
        err => ({
          status: err.statusCode,
          body: container.errorMapper.toResponse(err)
        }),
        result => ({
          status: HTTP_STATUS_CODES.OK,
          body: container.todoMapper.toResponse(result)
        })
      ),
      execute
    )
});
