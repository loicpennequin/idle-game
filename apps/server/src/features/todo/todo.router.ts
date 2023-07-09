import { todoContract } from '@daria/shared';
import { initServer } from '@ts-rest/express';
import { toResponse } from '../../utils/useCase';
import { HTTP_STATUS_CODES } from '../../utils/errorFactory';

const s = initServer();

export const todoRouter = s.router(todoContract, {
  async create({ body, req: { container } }) {
    return toResponse(
      await container.createTodoUseCase(body),
      HTTP_STATUS_CODES.CREATED,
      container.todoMapper.toResponse,
      container.errorMapper.toResponse
    );
  },

  async getById({ params, req: { container } }) {
    return toResponse(
      await container.getTodoUseCase(params.id),
      HTTP_STATUS_CODES.OK,
      container.todoMapper.toResponse,
      container.errorMapper.toResponse
    );
  },

  async getAll({ req: { container } }) {
    return toResponse(
      await container.getAllTodosUseCase(),
      HTTP_STATUS_CODES.OK,
      container.todoMapper.toResponseArray,
      container.errorMapper.toResponse
    );
  },

  async updateCompleted({ params, body, req: { container } }) {
    return toResponse(
      await container.toggleTodoUseCase(params.id, body.completed),
      HTTP_STATUS_CODES.OK,
      container.todoMapper.toResponse,
      container.errorMapper.toResponse
    );
  }
});
