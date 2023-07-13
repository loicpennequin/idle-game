import { queryKeys } from '@/features/core/queryKeys';
import { curry, type TodoResponse } from '@daria/shared';
import type { QueryClient } from '@tanstack/vue-query';

export const updateTodoListCache = curry(
  (queryClient: QueryClient, newTodo: TodoResponse) => {
    const todos = queryClient.getQueryData<TodoResponse[]>(queryKeys.todo.list.queryKey);

    const exists = todos?.some(t => t.id === newTodo.id);
    if (exists) return;

    const newTodos = todos ? [...todos, newTodo] : [newTodo];
    queryClient.setQueryData(queryKeys.todo.list.queryKey, newTodos);
  }
);

export const updateTodoCache = curry(
  (queryClient: QueryClient, updatedTodo: TodoResponse) => {
    const todos = queryClient.getQueryData<TodoResponse[]>(queryKeys.todo.list.queryKey);

    const newTodos = todos
      ? todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
      : [updatedTodo];

    queryClient.setQueryData(queryKeys.todo.list.queryKey, newTodos);
  }
);
