import { asFunction, asValue, Lifetime } from 'awilix';
import { createApp } from './app';
import { corsMiddleware } from './middlewares/cors.middleware';
import { requestScopeMiddleware } from './middlewares/requestScope.middleware';
import { createRouter, Router } from './router';
import { server } from './server';
import { prisma } from './prisma';
import { errorMapper } from './mappers/error.mapper';
import { createIo } from './io';

export const coreProviders = {
  server: asFunction(server, { lifetime: Lifetime.SINGLETON }),
  app: asFunction(createApp, { lifetime: Lifetime.SINGLETON }),
  router: asFunction(createRouter as () => Router), // avoids some circular self referencing type making TS confused
  corsMiddleware: asFunction(corsMiddleware),
  requestScopeMiddleware: asValue(requestScopeMiddleware),
  prisma: asValue(prisma),
  errorMapper: asFunction(errorMapper),
  io: asFunction(createIo, { lifetime: Lifetime.SINGLETON })
};