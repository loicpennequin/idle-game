import type { UseApiMutationOptions } from '@/features/core/composables/useApiQuery';
import { contract, type Contract } from '@daria/shared';
import type { UserApi } from '../api/user.api';

export const useSignup = (
  options: UseApiMutationOptions<Contract['user']['signup'], UserApi['signup']> = {}
) => {
  const { userApi } = useContainer();

  return createUseApiMutation(contract.user.signup, userApi.signup)(options);
};

export const useUpdateProfile = (
  options: UseApiMutationOptions<
    Contract['user']['updateProfile'],
    UserApi['updateProfile']
  > = {}
) => {
  const { userApi } = useContainer();

  return createUseApiMutation(
    contract.user.updateProfile,
    userApi.updateProfile
  )(options);
};
