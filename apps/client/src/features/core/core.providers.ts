import { asValue, asFunction, Lifetime } from 'awilix';
import { apiClient } from './apiClient';
import { queryClient } from './queryClient';
import { createSocket } from './socket';

export const coreProviders = {
  apiClient: asValue(apiClient),
  queryClient: asValue(queryClient),
  socket: asFunction(createSocket, { lifetime: Lifetime.SINGLETON })
};
