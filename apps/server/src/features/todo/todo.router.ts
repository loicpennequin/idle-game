import { contract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { HTTP_STATUS_CODES } from '../../utils/errorFactory';
import { pipe } from 'fp-ts/function';

const s = initServer();

export const todoRouter = s.router(contract.todo, {
  async create({ body, req: { container } }) {
    return pipe(
      await container.createTodoUseCase(body),
      container.responseMapper(HTTP_STATUS_CODES.CREATED, container.todoMapper.toResponse)
    );
  },

  async getById({ params, req: { container } }) {
    return pipe(
      await container.getTodoUseCase(params.id),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.todoMapper.toResponse)
    );
  },

  async getAll({ req: { container } }) {
    return pipe(
      await container.getAllTodosUseCase(),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.todoMapper.toResponseArray)
    );
  },

  async updateCompleted({ params, body, req: { container } }) {
    return pipe(
      await container.toggleTodoUseCase(params.id, body.completed),
      container.responseMapper(HTTP_STATUS_CODES.OK, container.todoMapper.toResponse)
    );
  }
});
