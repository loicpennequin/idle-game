import type { UserResponse } from '@daria/shared';
import type { QueryClient } from '@tanstack/vue-query';
import { authKeys } from './auth.keys';

export const updateSession = (qc: QueryClient, user: UserResponse | null) =>
  qc.setQueryData(authKeys.session.queryKey, user);
