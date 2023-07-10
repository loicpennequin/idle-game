import { Either } from '@daria/shared';
import { wrapUseCase } from '../../../utils/useCase';
import { UnexpectedError } from '../../../utils/errorFactory';
import { Todo } from '../todo.entity';
import { TodoRepository } from '../prismaTodo.repository';

export type GetAllTodosUseCaseError = UnexpectedError;

export type GetAllTodosUseCase = () => Promise<Either<GetAllTodosUseCaseError, Todo[]>>;

export const getAllTodosUseCase = ({
  todoRepo
}: {
  todoRepo: TodoRepository;
}): GetAllTodosUseCase => {
  return wrapUseCase(async () => {
    const todos = await todoRepo.findAll();

    return Either.right(todos);
  });
};
