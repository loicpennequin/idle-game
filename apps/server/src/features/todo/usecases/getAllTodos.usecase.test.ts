import { testInMemoryTodoRepository } from '../_test/inMemoryTodo.repository';
import { describe, it, expect, assertType } from 'vitest';
import { Todo } from '../entities/todo.entity';
import { getAllTodosUseCase } from './getallTodos.usecase';

describe('getAllTodoUsecase', () => {
  const setup = () => {
    const usecase = getAllTodosUseCase({
      todoRepo: testInMemoryTodoRepository([
        { id: 'first-id', text: 'test todo', completed: false },
        { id: 'second-id', text: 'test todo 2', completed: false }
      ])
    });

    return { usecase };
  };

  it('should return the todos', async () => {
    const { usecase } = setup();
    const result = await usecase();

    const todos = result.get();
    assertType<Todo[]>(todos);
    expect(todos.length).toBe(2);
  });
});
