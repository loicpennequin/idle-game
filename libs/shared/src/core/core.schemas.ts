import { z } from 'zod';
import { ERROR_KINDS, type ErrorKind } from './core.enums';

const kinds = Object.values(ERROR_KINDS);
const VALUES: [ErrorKind, ...ErrorKind[]] = [kinds[0], ...kinds.slice(1)];

export const ErrorResponse = z.object({
  kind: z.enum(VALUES),
  message: z.string()
});
export type ErrorResponse = z.infer<typeof ErrorResponse>;
