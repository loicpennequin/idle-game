import { mergeQueryKeys, type inferQueryKeyStore } from '@lukemorales/query-key-factory';
import { todoKeys } from '../todo/utils/todo.keys';
import { authKeys } from '../auth/utils/auth.keys';

export const queryKeys = mergeQueryKeys(todoKeys, authKeys);

export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
