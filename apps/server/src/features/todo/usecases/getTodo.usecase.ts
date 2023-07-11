import { UUID } from '@daria/shared';
import { NotFoundError, UnexpectedError } from '../../../utils/errorFactory';
import { TodoRepository } from '../todo.repository';
import { Todo } from '../todo.entity';
import * as TE from 'fp-ts/TaskEither';

export type GetTodoUseCaseError = NotFoundError | UnexpectedError;

export type GetTodoUseCase = (id: UUID) => TE.TaskEither<GetTodoUseCaseError, Todo>;

export const getTodoUseCase =
  ({ todoRepo }: { todoRepo: TodoRepository }): GetTodoUseCase =>
  input =>
    todoRepo.findById(input);
