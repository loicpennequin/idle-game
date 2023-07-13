import type { UseApiMutationOptions } from '@/features/core/composables/useApiQuery';
import type { Contract } from '@daria/shared';
import type { UserApi } from '../api/user.api';

export const useSignup = (
  options: UseApiMutationOptions<Contract['user']['signup'], UserApi['signup']> = {}
) => {
  const { userApi } = useContainer();

  return createUseApiMutation<Contract['user']['signup']>()({
    ...options,
    mutationFn: userApi.signup
  });
};
