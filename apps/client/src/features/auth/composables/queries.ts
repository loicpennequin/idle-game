import type { UseApiMutationOptions } from '@/features/core/composables/useApiQuery';
import type { Contract } from '@daria/shared';
import type { AuthApi } from '../api/auth.api';

export const useLogin = (
  options: UseApiMutationOptions<Contract['auth']['login'], AuthApi['login']> = {}
) => {
  const { authApi } = useContainer();

  return createUseApiMutation<Contract['auth']['login']>()({
    ...options,
    mutationFn: authApi.login
  });
};
