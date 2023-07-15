import { z } from 'zod';

export const ArenaResponse = z.object({
  id: z.string().cuid(),
  name: z.string(),
  maxSlots: z.number(),
  availableSlots: z.number(),
  size: z.number(),
  minLevel: z.number(),
  maxLevel: z.number()
});
export type ArenaResponse = z.infer<typeof ArenaResponse>;
