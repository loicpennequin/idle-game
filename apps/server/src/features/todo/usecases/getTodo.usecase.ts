import { UUID } from '@daria/shared';
import { NotFoundError, UnexpectedError } from '../../../utils/errorFactory';
import { TodoRepository } from '../todo.repository';
import { Todo } from '../todo.entity';
import * as E from 'fp-ts/Either';

export type GetTodoUseCaseError = NotFoundError | UnexpectedError;

export type GetTodoUseCase = (id: UUID) => Promise<E.Either<GetTodoUseCaseError, Todo>>;

type Dependencies = {
  todoRepo: TodoRepository;
};
export const getTodoUseCase = ({ todoRepo }: Dependencies): GetTodoUseCase =>
  todoRepo.findById;
