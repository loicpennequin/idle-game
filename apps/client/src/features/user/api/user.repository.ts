import type { ApiClient } from '@/features/core/apiClient';
import { apiHandler } from '@/utils/api-helpers';
import type { UserResponse, userContract } from '@daria/shared';
import type { ClientInferRequest, ClientInferResponses } from '@ts-rest/core';

export type SignupRequest = ClientInferRequest<typeof userContract.signup>;
export type SignupResponse = ClientInferResponses<typeof userContract.signup, 201>;

export type UserRepository = {
  signup: (input: SignupRequest['body']) => Promise<SignupResponse['body']>;
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
