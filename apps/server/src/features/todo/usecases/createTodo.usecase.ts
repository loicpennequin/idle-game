import { Either, TODO_EVENTS, todoContract } from '@daria/shared';
import { ServerInferRequest } from '@ts-rest/core';
import { wrapUseCase } from '../../../utils/useCase';
import { UnexpectedError } from '../../../utils/errorFactory';
import { TodoRepository } from '../prismaTodo.repository';
import { Io } from '../../core/io';
import { TodoMapper } from '../todo.mapper';
import { Todo } from '../todo.entity';

export type CreateTodoInput = ServerInferRequest<typeof todoContract.create>['body'];
export type CreateTodoUseCaseError = UnexpectedError;

export type CreateTodoUseCase = (
  dto: CreateTodoInput
) => Promise<Either<CreateTodoUseCaseError, Todo>>;

type Dependencies = {
  todoRepo: TodoRepository;
  io: Io;
  todoMapper: TodoMapper;
};

export const createTodoUseCase = ({
  todoRepo,
  io,
  todoMapper
}: Dependencies): CreateTodoUseCase => {
  return wrapUseCase(async (input: CreateTodoInput) => {
    const todo = await todoRepo.create(input);
    io.emit(TODO_EVENTS.TODO_CREATED, todoMapper.toResponse(todo));

    return Either.right(todo);
  });
};
