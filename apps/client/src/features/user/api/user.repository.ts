import type { ApiClient } from '@/features/core/apiClient';
import { apiHandler } from '@/utils/api-helpers';
import type { UserResponse, userContract } from '@daria/shared';
import type { ClientInferRequest } from '@ts-rest/core';

export type UserRepository = {
  signup: (
    input: ClientInferRequest<typeof userContract.signup>['body']
  ) => Promise<UserResponse>;
};

export const userRepository = ({
  apiClient
}: {
  apiClient: ApiClient;
}): UserRepository => {
  return {
    signup: body => apiHandler(apiClient.user.signup, { body })
  };
};
