import { z } from 'zod';
import { UserResponse } from '../user';

export const HeroResponse = z.object({
  id: z.string(),
  name: z.string(),
  owner: UserResponse
});
export type HeroResponse = z.infer<typeof HeroResponse>;
