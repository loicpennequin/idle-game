import { mergeQueryKeys, type inferQueryKeyStore } from '@lukemorales/query-key-factory';
import { todoKeys } from '../todo/utils/todo.keys';

export const queryKeys = mergeQueryKeys(todoKeys);

export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
