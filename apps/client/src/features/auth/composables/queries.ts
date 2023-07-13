import type {
  UseApiMutationOptions,
  UseApiQueryOptions
} from '@/features/core/composables/useApiQuery';
import type { Contract, Nullable } from '@daria/shared';
import type { AuthApi, LoginResponse } from '../api/auth.api';
import { QueryObserver } from '@tanstack/query-core';
import { queryKeys, type QueryKeys } from '@/features/core/queryKeys';

export const useLogin = (
  options: UseApiMutationOptions<Contract['auth']['login'], AuthApi['login']> = {}
) => {
  const { authApi } = useContainer();

  return createUseApiMutation<Contract['auth']['login']>()({
    ...options,
    mutationFn: authApi.login
  });
};

export const useLogout = (
  options: UseApiMutationOptions<Contract['auth']['logout'], AuthApi['logout']> = {}
) => {
  const { authApi } = useContainer();

  return createUseApiMutation<Contract['auth']['logout']>()({
    ...options,
    mutationFn: authApi.logout
  });
};

export const useIsAuthenticated = () => {
  const qc = useQueryClient();

  const query = useQuery({
    ...queryKeys.auth.token,
    queryFn: () =>
      Promise.resolve(
        qc.getQueryData<Nullable<LoginResponse['body']>>(queryKeys.auth.token.queryKey) ??
          null
      )
  });

  return computed(() => !!query.data.value?.accessToken);
};

export const useSession = (
  options: UseApiQueryOptions<
    Contract['auth']['session'],
    QueryKeys['auth']['session']['queryKey']
  > = {}
) => {
  const { authApi } = useContainer();

  return useQuery({
    ...options,
    ...queryKeys.auth.session,
    queryFn: authApi.session
  });
};
