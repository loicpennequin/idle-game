import { createQueryKeys, type inferQueryKeys } from '@lukemorales/query-key-factory';
import type { UUID } from '@daria/shared';
import type { MaybeRef } from '@/utils/types';
import type { ApiClient } from '@/features/core/apiClient';

export const createTodoKeys = ({ apiClient }: { apiClient: ApiClient }) =>
  createQueryKeys('todo', {
    detail: (todoId: MaybeRef<UUID>) => ({
      queryKey: [todoId]
    }),
    list: null
  });

export type TodoKeysDefs = ReturnType<typeof createTodoKeys>;
export type TodoKeys = inferQueryKeys<ReturnType<typeof createTodoKeys>>;
