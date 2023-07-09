import type { ApiClient } from '@/features/core/apiClient';
import { apiHandler } from '@/features/core/utils/is-api-error';
import type { UUID } from '@daria/shared';

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export const todoRepository = ({ apiClient }: { apiClient: ApiClient }) => {
  return {
    getAll: () => apiHandler(apiClient.todo.getAll),
    getById: (id: UUID) => apiHandler(apiClient.todo.getById, { params: { id } }),
    create: (text: string) => apiHandler(apiClient.todo.create, { body: { text } }),
    updateCompleted: ({ id, completed }: { id: UUID; completed: boolean }) =>
      apiHandler(apiClient.todo.updateCompleted, { params: { id }, body: { completed } })
  };
};
