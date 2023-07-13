import 'express-async-errors';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { createExpressEndpoints } from '@ts-rest/express';
import { ERROR_KINDS, contract } from '@daria/shared';
import { errorFactory } from '../../utils/errorFactory';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { RequestScopeMiddleware } from './middlewares/requestScope.middleware';
import { router } from './router';
import cookieParser from 'cookie-parser';
import { Config } from '../../config';

export type App = Express;

export const createApp = ({
  corsMiddleware,
  requestScopeMiddleware,
  config
}: {
  corsMiddleware: CorsMiddleware;
  requestScopeMiddleware: RequestScopeMiddleware;
  config: Config;
}): App => {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(corsMiddleware as any);
  app.use(cookieParser(config.COOKIE.SECRET));

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
