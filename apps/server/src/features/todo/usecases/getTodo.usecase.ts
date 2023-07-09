import { Either, isDefined, UUID } from '@daria/shared';
import { wrapUseCase } from '../../../utils/useCase';
import { errorFactory } from '../../../utils/errorFactory';
import { NotFoundError, UnexpectedError } from '../../../utils/errorFactory';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../prismaTodo.repository';

export type GetTodoUseCaseError = NotFoundError | UnexpectedError;

export type GetTodoUseCase = (id: UUID) => Promise<Either<GetTodoUseCaseError, Todo>>;

export const getTodoUseCase = ({
  todoRepo
}: {
  todoRepo: TodoRepository;
}): GetTodoUseCase => {
  return wrapUseCase(async (id: UUID) => {
    const todo = await todoRepo.findById(id);

    if (!isDefined(todo)) {
      return Either.left(errorFactory.notFound());
    }

    return Either.right(todo);
  });
};
