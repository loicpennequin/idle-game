import type { ApiClient } from '@/features/core/apiClient';
import { apiHandler } from '@/utils/api-helpers';
import type { TodoResponse, UUID } from '@daria/shared';

export type TodoRepository = {
  getAll: () => Promise<TodoResponse[]>;
  getById: (id: UUID) => Promise<TodoResponse>;
  create: (text: string) => Promise<TodoResponse>;
  updateCompleted: (arg: { id: UUID; completed: boolean }) => Promise<TodoResponse>;
};

export const todoRepository = ({
  apiClient
}: {
  apiClient: ApiClient;
}): TodoRepository => {
  return {
    getAll: () => apiHandler(apiClient.todo.getAll),
    getById: id => apiHandler(apiClient.todo.getById, { params: { id } }),
    create: text => apiHandler(apiClient.todo.create, { body: { text } }),
    updateCompleted: ({ id, completed }) =>
      apiHandler(apiClient.todo.updateCompleted, { params: { id }, body: { completed } })
  };
};
