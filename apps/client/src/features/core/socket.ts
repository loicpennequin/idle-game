import { TODO_EVENTS, type IoEvents, type TodoResponse } from '@daria/shared';
import type { QueryClient } from '@tanstack/vue-query';
import type { QueryKeys } from './queryKeys';
import { io, type Socket } from 'socket.io-client';

export const createSocket = ({
  queryKeys,
  queryClient
}: {
  queryKeys: QueryKeys;
  queryClient: QueryClient;
}) => {
  const socket: Socket<IoEvents, {}> = io(import.meta.env.VITE_API_URL, {
    transports: ['websocket'],
    autoConnect: false
    // auth: cb => cb({ token: authService.getToken() })
  });

  socket.on(TODO_EVENTS.TODO_CREATED, todo => {
    const todos = queryClient.getQueryData<TodoResponse[]>(
      queryKeys.todo.detail.queryKey
    );
    if (!todos) return;
    if (todos.find(t => t.id === todo.id)) return;

    queryClient.setQueryData(queryKeys.todo.list.queryKey, [...todos, todo]);
  });

  return socket;
};
