import { TODO_EVENTS, todoContract } from '@daria/shared';
import { ServerInferRequest } from '@ts-rest/core';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as IO from 'fp-ts/IO';
import { flow } from 'fp-ts/function';
import { UnexpectedError } from '../../../utils/errorFactory';
import { TodoRepository } from '../todo.repository';
import { Io } from '../../core/io';
import { TodoMapper } from '../todo.mapper';
import { Todo } from '../todo.entity';

export type CreateTodoInput = ServerInferRequest<typeof todoContract.create>['body'];
export type CreateTodoUseCaseError = UnexpectedError;

export type CreateTodoUseCase = (
  dto: CreateTodoInput
) => Promise<E.Either<CreateTodoUseCaseError, Todo>>;

type Dependencies = {
  todoRepo: TodoRepository;
  io: Io;
  todoMapper: TodoMapper;
};

export const createTodoUseCase =
  ({ todoRepo, io, todoMapper }: Dependencies): CreateTodoUseCase =>
  async input => {
    const todo = await todoRepo.create(input);

    if (E.isLeft(todo)) return todo;

    io.emit(TODO_EVENTS.TODO_CREATED, todoMapper.toResponse(todo.right));

    return todo;
  };
