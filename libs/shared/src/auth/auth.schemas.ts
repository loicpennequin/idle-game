import { z } from 'zod';

export const LoginResponse = z.object({
  issued_at: z.coerce.date(),
  expires_in: z.number()
});
export type LoginResponse = z.infer<typeof LoginResponse>;
