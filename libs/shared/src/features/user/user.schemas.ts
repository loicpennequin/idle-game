import { z } from 'zod';

export const UserResponse = z.object({
  id: z.string(),
  email: z.string().email()
});

export type UserResponse = z.infer<typeof UserResponse>;
