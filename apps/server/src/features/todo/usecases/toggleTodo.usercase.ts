import { Either, TODO_EVENTS, UUID } from '@daria/shared';
import { wrapUseCase } from '../../../utils/useCase';
import {
  NotFoundError,
  UnexpectedError,
  errorFactory
} from '../../../utils/errorFactory';
import { Todo } from '../todo.entity';
import { TodoRepository } from '../prismaTodo.repository';
import { Io } from '../../core/io';
import { TodoMapper } from '../todo.mapper';

export type ToggleTodoUseCaseError = UnexpectedError | NotFoundError;

export type ToggleTodoUseCase = (
  id: UUID,
  completed: boolean
) => Promise<Either<ToggleTodoUseCaseError, Todo>>;

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
  return wrapUseCase(async (id: UUID, completed: boolean) => {
    const todo = await todoRepo.updateCompletedById(id, completed);

    if (!todo) {
      return Either.left(errorFactory.notFound());
    }

    io.emit(TODO_EVENTS.TODO_UPDATED, todoMapper.toResponse(todo));

    return Either.right(todo);
  });
};
