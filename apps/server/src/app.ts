import 'express-async-errors';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { createExpressEndpoints } from '@ts-rest/express';
import { ERROR_KINDS, contract } from '@daria/shared';
import { router } from './features/core/router';
import { errorFactory } from './utils/errorFactory';
import { CorsMiddleware } from './features/core/middlewares/cors.middleware';
import { RequestScopeMiddleware } from './features/core/middlewares/requestScope.middleware';

export type App = Express;

export const createApp = ({
  corsMiddleware,
  requestScopeMiddleware
}: {
  corsMiddleware: CorsMiddleware;
  requestScopeMiddleware: RequestScopeMiddleware;
}): App => {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(corsMiddleware as any);

  createExpressEndpoints(contract, router, app, {
    responseValidation: true,
    globalMiddleware: [requestScopeMiddleware],
    requestValidationErrorHandler: (err, req, res) => {
      res
        .status(400)
        .json(
          req.container.errorMapper.toResponse(
            errorFactory.badRequest({ kind: ERROR_KINDS.VALIDATION_ERROR })
          )
        );
    }
  });

  return app;
};
