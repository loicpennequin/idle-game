import { mergeQueryKeys, type inferQueryKeyStore } from '@lukemorales/query-key-factory';
import type { TodoKeysDefs } from '../todo/utils/todo.keys';

export const createQueryKeys = ({ todoKeys }: { todoKeys: TodoKeysDefs }) =>
  mergeQueryKeys(todoKeys);

export type QueryKeys = inferQueryKeyStore<ReturnType<typeof createQueryKeys>>;
