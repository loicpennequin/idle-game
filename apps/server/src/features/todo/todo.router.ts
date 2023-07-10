import { todoContract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';
import { execute } from '../../utils/helpers';

const s = initServer();

export const todoRouter = s.router(todoContract, {
  create: ({ body, req: { container } }) => {
    const result = pipe(
      container.createTodoUseCase(body),
      container.responseMapper(
        HTTP_STATUS_CODES.CREATED,
        container.todoMapper.toResponse
      ),
      execute
    );

    return result;
  },
  getById: ({ params, req: { container } }) =>
    pipe(
      container.getTodoUseCase(params.id),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.todoMapper.toResponse),
      execute
    ),

  getAll: ({ req: { container } }) =>
    pipe(
      container.getAllTodosUseCase(),
      container.responseMapper(
        HTTP_STATUS_CODES.OK,
        container.todoMapper.toResponseArray
      ),
      execute
    ),

  updateCompleted: ({ params, body, req: { container } }) =>
    pipe(
      container.toggleTodoUseCase(params.id, body.completed),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.todoMapper.toResponse),
      execute
    )
});
