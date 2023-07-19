import type {
  UseApiMutationOptions,
  UseApiQueryOptions
} from '@/features/core/composables/useApiQuery';
import { contract, type Contract, type Nullable } from '@daria/shared';
import type { AuthApi, LoginResponse } from '../api/auth.api';
import { queryKeys, type QueryKeys } from '@/features/core/queryKeys';

export const useLogin = (
  options: UseApiMutationOptions<Contract['auth']['login'], AuthApi['login']> = {}
) => {
  const { authApi } = useContainer();

  return createUseApiMutation(contract.auth.login, authApi.login)(options);
};

export const useLogout = (
  options: UseApiMutationOptions<Contract['auth']['logout'], AuthApi['logout']> = {}
) => {
  const { authApi } = useContainer();

  return createUseApiMutation(contract.auth.logout, authApi.logout)(options);
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
  const isAuthenticated = useIsAuthenticated();

  return createUseApiQuery<Contract['auth']['session']>()({
    ...options,
    ...queryKeys.auth.session,
    queryFn: authApi.session,
    enabled: isAuthenticated
  });
};
