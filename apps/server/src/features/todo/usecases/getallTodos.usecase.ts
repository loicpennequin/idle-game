import * as TE from 'fp-ts/TaskEither';
import { UnexpectedError } from '../../../utils/errorFactory';
import { Todo } from '../todo.entity';
import { TodoRepository } from '../prismaTodo.repository';

export type GetAllTodosUseCaseError = UnexpectedError;
export type GetAllTodosUseCase = () => TE.TaskEither<GetAllTodosUseCaseError, Todo[]>;

export const getAllTodosUseCase =
  ({ todoRepo }: { todoRepo: TodoRepository }): GetAllTodosUseCase =>
  () =>
    todoRepo.findAll();
