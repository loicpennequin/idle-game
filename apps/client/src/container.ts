import { createTypedContainer } from '@daria/shared';
import { todoProviders } from './features/todo/todo.providers';
import { coreProviders } from './features/core/core.providers';
import { userProviders } from './features/user/user.providers';

const dependencies = {
  ...coreProviders,
  ...todoProviders,
  ...userProviders
};
export const container = createTypedContainer(dependencies);

export type Container = typeof container;
