import { asValue, asFunction, Lifetime } from 'awilix';
import { apiClient } from './apiClient';
import { queryClient } from './queryClient';
import { createSocket } from './socket';
import { createQueryKeys } from './queryKeys';

export const coreProviders = {
  apiClient: asValue(apiClient),
  queryClient: asValue(queryClient),
  queryKeys: asFunction(createQueryKeys),
  socket: asFunction(createSocket, { lifetime: Lifetime.SINGLETON })
};
