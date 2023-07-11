import { z } from 'zod';

export const UserResponse = z.object({
  id: z.string()
});
export type UserResponse = z.infer<typeof UserResponse>;
