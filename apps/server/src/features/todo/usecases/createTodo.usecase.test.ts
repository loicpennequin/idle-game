import { testInMemoryTodoRepository } from '../_test/inMemoryTodo.repository';
import { describe, it, expect, assertType } from 'vitest';
import { createTodoUseCase } from './createTodo.usecase';
import { Todo } from '../entities/todo.entity';
import { Io } from '../../core/io';
import { TodoMapper } from '../todo.mapper';

describe('createTodoUsecase', () => {
  const setup = () => {
    const usecase = createTodoUseCase({
      todoRepo: testInMemoryTodoRepository([]),
      todoMapper: { toResponse: () => {} } as unknown as TodoMapper,
      io: { emit: () => {} } as unknown as Io
    });

    return { usecase };
  };

  it('should return the new todo', async () => {
    const { usecase } = setup();
    const result = await usecase({ text: 'new todo' });

    const todo = result.get();

    assertType<Todo>(todo);
    expect(todo.text).toBe('new todo');
  });
});
