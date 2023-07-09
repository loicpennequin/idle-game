import { CreateTodoDto, Either, TODO_EVENTS } from '@daria/shared';
import { wrapUseCase } from '../../../utils/useCase';
import { UnexpectedError } from '../../../utils/errorFactory';
import { Todo } from '../entities/todo.entity';
import { TodoRepository } from '../prismaTodo.repository';
import { Io } from '../../core/io';
import { TodoMapper } from '../todo.mapper';

export type CreateTodoUseCaseError = UnexpectedError;

export type CreateTodoUseCase = (
  dto: CreateTodoDto
) => Promise<Either<CreateTodoUseCaseError, Todo>>;

type Dependencies = {
  todoRepo: TodoRepository;
  io: Io;
  todoMapper: TodoMapper;
};

export const createTodoUseCase = ({
  todoRepo,
  io,
  todoMapper
}: Dependencies): CreateTodoUseCase => {
  return wrapUseCase(async (dto: CreateTodoDto) => {
    const todo = await todoRepo.create(dto);
    io.emit(TODO_EVENTS.TODO_CREATED, todoMapper.toResponse(todo));

    return Either.right(todo);
  });
};
