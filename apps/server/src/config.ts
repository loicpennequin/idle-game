import z from 'zod';

const configSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  IS_DEV: z.boolean(),
  IS_PROD: z.boolean(),
  CORS: z.object({
    ALLOWED_ORIGINS: z.array(z.string())
  })
});

export const config = configSchema.parse({
  PORT: process.env.PORT ?? 5000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  CORS: {
    ALLOWED_ORIGINS: ['http://localhost:5173']
  }
});

export type Config = z.infer<typeof configSchema>;
