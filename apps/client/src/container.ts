import { createTypedContainer } from '@daria/shared';
import { todoProviders } from './features/todo/todo.providers';
import { coreProviders } from './features/core/core.providers';

const dependencies = {
  ...coreProviders,
  ...todoProviders
};
export const container = createTypedContainer(dependencies);

export type Container = typeof container;
