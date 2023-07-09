import { asValue } from 'awilix';
import { TsRestRequestHandler } from '@ts-rest/express';
import { Contract } from '@daria/shared';
import { container } from '../../../container';

export type RequestScopeMiddleware = TsRestRequestHandler<Contract>;

export const requestScopeMiddleware: RequestScopeMiddleware = (req, res, next) => {
  const scope = container.createScope();
  scope.register('req', asValue(req));
  scope.register('res', asValue(res));

  req.container = scope.cradle;

  next();
};
