import { TODO_EVENTS, noop, type TodoResponse, type UUID } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';
import type { AppSocket } from '@/features/core/socket';
import type { QueryClient } from '@tanstack/vue-query';
import { updateTodoCache, updateTodoListCache } from '../utils/cache';

type SubscriberCallback = (todo: TodoResponse) => void;

export type TodoApi = {
  getAll: () => Promise<TodoResponse[]>;
  getById: (id: UUID) => Promise<TodoResponse>;
  create: (text: string) => Promise<TodoResponse>;
  updateCompleted: (arg: { id: UUID; completed: boolean }) => Promise<TodoResponse>;
  subscribe: (cbs?: {
    onCreated?: SubscriberCallback;
    onUpdated?: SubscriberCallback;
  }) => () => void;
};

type Dependencies = {
  apiClient: ApiClient;
  queryClient: QueryClient;
  socket: AppSocket;
};
export const todoApi = ({ apiClient, socket, queryClient }: Dependencies): TodoApi => {
  return {
    getAll: () => apiHandler(apiClient.todo.getAll),

    getById: id => apiHandler(apiClient.todo.getById, { params: { id } }),

    create: async text => {
      const todo = await apiHandler(apiClient.todo.create, { body: { text } });
      updateTodoListCache(queryClient, todo);

      return todo;
    },

    updateCompleted: async ({ id, completed }) => {
      const todo = await apiHandler(apiClient.todo.updateCompleted, {
        params: { id },
        body: { completed }
      });
      updateTodoCache(queryClient, todo);
      return todo;
    },

    subscribe({ onCreated = noop, onUpdated = noop } = {}) {
      socket.on(TODO_EVENTS.TODO_CREATED, onCreated);
      socket.on(TODO_EVENTS.TODO_CREATED, onUpdated);

      return () => {
        socket.off(TODO_EVENTS.TODO_CREATED, onCreated);
        socket.off(TODO_EVENTS.TODO_UPDATED, onUpdated);
      };
    }
  };
};
