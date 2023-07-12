import { ONE_MINUTE_IN_SECONDS, ONE_WEEK_IN_SECONDS } from '@daria/shared';
import z from 'zod';

const configSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  IS_DEV: z.boolean(),
  IS_PROD: z.boolean(),

  CORS: z.object({
    ALLOWED_ORIGINS: z.array(z.string())
  }),

  JWT: z.object({
    SECRET: z.string(),
    EXPIRES_IN_SECONDS: z.number()
  }),

  REFRESH_TOKEN: z.object({
    SECRET: z.string(),
    EXPIRES_IN_SECONDS: z.number(),
    PATH: z.string(),
    HTTPONLY: z.boolean(),
    SAMESITE: z.enum(['none', 'lax', 'strict']),
    SECURE: z.boolean()
  })
});

export const config = (): Config =>
  configSchema.parse({
    PORT: process.env.PORT ?? 5000,
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    IS_DEV: process.env.NODE_ENV === 'development',
    IS_PROD: process.env.NODE_ENV === 'production',

    CORS: {
      ALLOWED_ORIGINS: ['http://localhost:5173', 'http://localhost:5000']
    },

    JWT: {
      SECRET: process.env.ACCESS_TOKEN_SECRET,
      EXPIRES_IN_SECONDS: ONE_MINUTE_IN_SECONDS * 15
    },

    REFRESH_TOKEN: {
      SECRET: process.env.REFRESH_TOKEN_SECRET,
      EXPIRES_IN_SECONDS: ONE_WEEK_IN_SECONDS,
      PATH: '/',
      HTTPONLY: true,
      SECURE: process.env.NODE_ENV === 'production',
      SAMESITE: 'lax'
    }
  });

export type Config = z.infer<typeof configSchema>;
