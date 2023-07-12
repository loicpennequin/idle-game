import { TODO_EVENTS, UUID } from '@daria/shared';
import * as E from 'fp-ts/Either';
import * as IO from 'fp-ts/IO';
import { flow } from 'fp-ts/function';
import { NotFoundError, UnexpectedError } from '../../../utils/errorFactory';
import { Todo } from '../todo.entity';
import { TodoRepository } from '../todo.repository';
import { Io } from '../../core/io';
import { TodoMapper } from '../todo.mapper';

export type ToggleTodoUseCaseError = UnexpectedError | NotFoundError;

export type ToggleTodoUseCase = (
  id: UUID,
  completed: boolean
) => Promise<E.Either<ToggleTodoUseCaseError, Todo>>;

type Dependencies = {
  todoRepo: TodoRepository;
  io: Io;
  todoMapper: TodoMapper;
};

export const toggleTodoUseCase =
  ({ todoRepo, io, todoMapper }: Dependencies): ToggleTodoUseCase =>
  async (id, completed) => {
    const todo = await todoRepo.updateCompletedById(id, completed);

    if (E.isLeft(todo)) return todo;

    io.emit(TODO_EVENTS.TODO_UPDATED, todoMapper.toResponse(todo.right));

    return todo;
  };
