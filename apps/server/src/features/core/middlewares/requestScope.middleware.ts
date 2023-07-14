import { asValue } from 'awilix';
import { TsRestRequestHandler } from '@ts-rest/express';
import { Contract } from '@daria/shared';
import { RequestScopedContainer, container } from '../../../container';
import { isRight } from 'fp-ts/lib/Either';

declare global {
  namespace Express {
    interface Request {
      container: RequestScopedContainer['cradle'];
    }
  }
}

export type RequestScopeMiddleware = TsRestRequestHandler<Contract>;

const parseAuthHeader = (header: string) => header.split(' ')[1];

export const requestScopeMiddleware: RequestScopeMiddleware = async (req, res, next) => {
  const scope = container.createScope();
  scope.register('req', asValue(req));
  scope.register('res', asValue(res));

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const session = await container.cradle.authenticateUseCase(
      parseAuthHeader(authHeader)
    );

    if (isRight(session)) {
      scope.register('session', asValue(session.right));
    }
  }

  req.container = scope.cradle;

  next();
};
