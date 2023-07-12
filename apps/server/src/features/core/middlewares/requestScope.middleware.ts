import { asValue } from 'awilix';
import { TsRestRequestHandler } from '@ts-rest/express';
import { Contract } from '@daria/shared';
import { RequestScopedContainer, container } from '../../../container';

declare global {
  namespace Express {
    interface Request {
      container: RequestScopedContainer['cradle'];
    }
  }
}

export type RequestScopeMiddleware = TsRestRequestHandler<Contract>;

const parseAuthHeader = (header: string) => header.replace('Bearer ', '');

export const requestScopeMiddleware: RequestScopeMiddleware = async (req, res, next) => {
  const scope = container.createScope();
  scope.register('req', asValue(req));
  scope.register('res', asValue(res));

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const session = await container.cradle.authenticateUseCase(
      parseAuthHeader(authHeader)
    );
    scope.register('session', asValue(session));
  }

  req.container = scope.cradle;

  next();
};
