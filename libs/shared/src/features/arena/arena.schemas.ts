import { z } from 'zod';

export const ArenaResponse = z.object({
  id: z.string()
});
export type ArenaResponse = z.infer<typeof ArenaResponse>;
