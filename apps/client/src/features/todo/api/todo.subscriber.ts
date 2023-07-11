import { TODO_EVENTS, type IoEvents, type TodoResponse } from '@daria/shared';
import type { QueryClient } from '@tanstack/vue-query';
import type { AppSocket } from '@/features/core/socket';
import type { QueryKeys } from '@/features/core/queryKeys';

export type TodoSubscriber = {
  subscribe(): () => void;
};

export const todoSubscriber = ({
  queryKeys,
  queryClient,
  socket
}: {
  queryKeys: QueryKeys;
  queryClient: QueryClient;
  socket: AppSocket;
}): TodoSubscriber => {
  return {
    subscribe() {
      socket.on(TODO_EVENTS.TODO_CREATED, newTodo => {
        const todos = queryClient.getQueryData<TodoResponse[]>(
          queryKeys.todo.detail.queryKey
        );
        if (todos?.find(todo => todo.id === newTodo.id)) return;

        const newTodos = todos ? [...todos, newTodo] : [newTodo];
        queryClient.setQueryData(queryKeys.todo.list.queryKey, newTodos);
      });

      socket.on(TODO_EVENTS.TODO_UPDATED, updatedTodo => {
        const todos = queryClient.getQueryData<TodoResponse[]>(
          queryKeys.todo.detail.queryKey
        );
        if (!todos) return;

        const newTodos = todos
          ? todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
          : [updatedTodo];

        queryClient.setQueryData(queryKeys.todo.list.queryKey, newTodos);
      });

      return () => {
        socket.off(TODO_EVENTS.TODO_CREATED);
        socket.off(TODO_EVENTS.TODO_UPDATED);
      };
    }
  };
};
