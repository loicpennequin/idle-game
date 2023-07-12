import * as E from 'fp-ts/Either';
import { UnexpectedError } from '../../../utils/errorFactory';
import { Todo } from '../todo.entity';
import { TodoRepository } from '../todo.repository';

export type GetAllTodosUseCaseError = UnexpectedError;
export type GetAllTodosUseCase = () => Promise<E.Either<GetAllTodosUseCaseError, Todo[]>>;

export const getAllTodosUseCase = ({
  todoRepo
}: {
  todoRepo: TodoRepository;
}): GetAllTodosUseCase => todoRepo.findAll;
