/**
 *  THE CONTENT OF THIS FILE IS AUTOGENERATED BY THE CLI. DONT EDIT IT DIRECTLY
 *  If you need to edit the template, to to libs/cli/src/commands/feature.ts
 */
import { mergeQueryKeys, type inferQueryKeyStore } from '@lukemorales/query-key-factory';
import { arenaKeys } from '../arena/utils/arena.keys';
import { authKeys } from '../auth/utils/auth.keys';
import { heroKeys } from '../hero/utils/hero.keys';
import { todoKeys } from '../todo/utils/todo.keys';

export const queryKeys = mergeQueryKeys(arenaKeys, authKeys, heroKeys, todoKeys);
export type QueryKeys = inferQueryKeyStore<typeof queryKeys>;
