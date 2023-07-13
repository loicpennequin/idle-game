import 'express-async-errors';
import express, { Express } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { createExpressEndpoints } from '@ts-rest/express';
import { ERROR_KINDS, contract } from '@daria/shared';
import { errorFactory } from '../../utils/errorFactory';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { RequestScopeMiddleware } from './middlewares/requestScope.middleware';
import { router } from './router';
import cookieParser from 'cookie-parser';
import { Config } from '../../config';
import { generateOpenApi } from '@ts-rest/open-api';

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

  const openApiDocument = generateOpenApi(
    contract,
    {
      info: {
        title: 'Idle game API',
        version: '1.0.0'
      }
    },
    {
      setOperationId: true
    }
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(corsMiddleware as any);
  app.use(cookieParser(config.COOKIE.SECRET));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  createExpressEndpoints(contract, router, app, {
    responseValidation: true,
    globalMiddleware: [
      requestScopeMiddleware,
      (req, res, next) => {
        if ('metadata' in req.tsRestRoute) {
          const meta = req.tsRestRoute.metadata;
          if (meta.needsAuth && !req.container.session) {
            return res
              .status(401)
              .json(req.container.errorMapper.toResponse(errorFactory.unauthorized()));
          }
        }

        next();
      }
    ],
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
