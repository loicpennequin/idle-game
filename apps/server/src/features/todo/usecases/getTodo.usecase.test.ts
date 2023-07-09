import { testInMemoryTodoRepository } from '../_test/inMemoryTodo.repository';
import { describe, it, expect, assertType } from 'vitest';
import { getTodoUseCase } from './getTodo.usecase';
import { AppError, NotFoundError } from '../../../utils/errorFactory';
import { Todo } from '../entities/todo.entity';
import { GetTodoUseCaseError } from '../interfaces/getTodoUsecase.interface';

describe('getTodoUsecase', () => {
  const setup = () => {
    const id = 'some-id';

    const usecase = getTodoUseCase({
      todoRepo: testInMemoryTodoRepository([{ id, text: 'test todo', completed: false }])
    });

    return { id, usecase };
  };

  it('should find the todo', async () => {
    const { id, usecase } = setup();
    const result = await usecase(id);

    const todo = result.get();
    assertType<Todo>(todo);
    expect(todo.id).toBe(id);
  });

  it("should return NotFoundError if it can't find the todo", async () => {
    const { usecase } = setup();

    const result = await usecase('another-id');

    const error = result.getLeft();
    assertType<GetTodoUseCaseError>(error);
    expect(error.statusCode).toBe(404);
  });
});
