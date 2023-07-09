import { AnyFunction, Nullable, Contract } from '@daria/shared';
import { Config } from '../../../config';
import cors from 'cors';
import { TsRestRequestHandler } from '@ts-rest/express';

export type CorsMiddleware = TsRestRequestHandler<Contract>;

export const corsMiddleware = ({ config }: { config: Config }) =>
  cors({
    credentials: true,
    origin: (origin: Nullable<string>, callback: AnyFunction) => {
      if (!origin || config.CORS.ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS'));
      }
    }
  }) as unknown as CorsMiddleware;
