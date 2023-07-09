import { CreateTodoDto, Either } from '@daria/shared';
import { wrapUseCase } from '../../../utils/useCase';
import { UnexpectedError } from '../../../utils/errorFactory';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../repository/prismaTodo.repository';

export type CreateTodoUseCaseError = UnexpectedError;

export type CreateTodoUseCase = (
  dto: CreateTodoDto
) => Promise<Either<CreateTodoUseCaseError, Todo>>;

export const createTodoUseCase = ({
  todoRepo
}: {
  todoRepo: TodoRepository;
}): CreateTodoUseCase => {
  return wrapUseCase(async (dto: CreateTodoDto) => {
    const todo = await todoRepo.create(dto);

    return Either.right(todo);
  });
};
