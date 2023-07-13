import { createQueryKeys, type inferQueryKeys } from '@lukemorales/query-key-factory';
import type { UUID } from '@daria/shared';
import type { MaybeRef } from '@/utils/types';

export const todoKeys = createQueryKeys('todo', {
  detail: (todoId: MaybeRef<UUID>) => ({
    queryKey: [todoId]
  }),
  list: null
});

export type TodoKeysDefs = typeof todoKeys;
export type TodoKeys = inferQueryKeys<typeof todoKeys>;
