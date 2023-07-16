import { z } from 'zod';
import { UserResponse } from '../user';

export const HeroResponse = z.object({
  id: z.string().cuid(),
  name: z.string(),
  owner: UserResponse,
  level: z.number(),
  arenaId: z.string().cuid().nullable(),
  joinedArenaAt: z.coerce.date().nullable()
});
export type HeroResponse = z.infer<typeof HeroResponse>;
