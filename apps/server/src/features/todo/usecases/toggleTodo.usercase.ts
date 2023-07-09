import { Either, UUID } from '@daria/shared';
import { wrapUseCase } from '../../../utils/useCase';
import { NotFoundError, UnexpectedError } from '../../../utils/errorFactory';
import { Todo } from '../entities/todo.entity';
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

export const toggleTodoUseCase = ({ todoRepo }: Dependencies): ToggleTodoUseCase => {
  return wrapUseCase(async (id: UUID, completed: boolean) => {
    const todo = await todoRepo.updateCompletedById(id, completed);

    return Either.right(todo);
  });
};
