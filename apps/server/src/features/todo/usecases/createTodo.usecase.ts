import { TODO_EVENTS, todoContract } from '@daria/shared';
import { ServerInferRequest } from '@ts-rest/core';
import * as TE from 'fp-ts/TaskEither';
import * as IO from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';
import { UnexpectedError } from '../../../utils/errorFactory';
import { TodoRepository } from '../prismaTodo.repository';
import { Io } from '../../core/io';
import { TodoMapper } from '../todo.mapper';
import { Todo } from '../todo.entity';

export type CreateTodoInput = ServerInferRequest<typeof todoContract.create>['body'];
export type CreateTodoUseCaseError = UnexpectedError;

export type CreateTodoUseCase = (
  dto: CreateTodoInput
) => TE.TaskEither<CreateTodoUseCaseError, Todo>;

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
  return (input: CreateTodoInput) =>
    pipe(
      todoRepo.create(input),
      TE.flatMapIO(todo => {
        io.emit(TODO_EVENTS.TODO_CREATED, todoMapper.toResponse(todo));
        return IO.of(todo);
      })
    );
};
