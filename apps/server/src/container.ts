import { Express } from 'express';
import { asValue } from 'awilix';
import { TypedAwilixContainer, createTypedContainer } from '@daria/shared';
import { config } from './config';
import { coreProviders } from './features/core/core.providers';
import { todoProviders } from './features/todo/todo.providers';

const dependencies = {
  config: asValue(config),
  req: asValue(null),
  res: asValue(null),
  ...coreProviders,
  ...todoProviders
};

export const container = createTypedContainer(dependencies);

export type Container = typeof container;
export type RequestScopedContainer = TypedAwilixContainer<
  typeof dependencies & {
    req: Express['request'];
    res: Express['response'];
  }
>;
