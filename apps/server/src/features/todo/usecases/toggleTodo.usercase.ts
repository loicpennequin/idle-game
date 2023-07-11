import { Either, TODO_EVENTS, UUID } from '@daria/shared';
import * as TE from 'fp-ts/TaskEither';
import * as IO from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';
import { wrapUseCase } from '../../../utils/useCase';
import {
  NotFoundError,
  UnexpectedError,
  errorFactory
} from '../../../utils/errorFactory';
import { Todo } from '../todo.entity';
import { TodoRepository } from '../todo.repository';
import { Io } from '../../core/io';
import { TodoMapper } from '../todo.mapper';

export type ToggleTodoUseCaseError = UnexpectedError | NotFoundError;

export type ToggleTodoUseCase = (
  id: UUID,
  completed: boolean
) => TE.TaskEither<ToggleTodoUseCaseError, Todo>;

type Dependencies = {
  todoRepo: TodoRepository;
  io: Io;
  todoMapper: TodoMapper;
};

export const toggleTodoUseCase = ({
  todoRepo,
  io,
  todoMapper
}: Dependencies): ToggleTodoUseCase => {
  return (id, completed) =>
    pipe(
      todoRepo.updateCompletedById(id, completed),
      TE.flatMapIO(todo => {
        io.emit(TODO_EVENTS.TODO_UPDATED, todoMapper.toResponse(todo));
        return IO.of(todo);
      })
    );
};
