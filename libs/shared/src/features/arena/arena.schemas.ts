import { z } from 'zod';
import { HeroResponse } from '../hero';

export const ArenaHeroResponse = z.object({
  hero: HeroResponse,
  arenaId: z.string().cuid(),
  joinedAt: z.coerce.date().nullable(),
  position: z.object({
    x: z.number().positive().int(),
    y: z.number().positive().int()
  })
});
export type ArenaHeroResponse = z.infer<typeof ArenaHeroResponse>;

export const ArenaResponse = z.object({
  id: z.string().cuid(),
  name: z.string(),
  maxSlots: z.number().positive().int(),
  availableSlots: z.number().positive().int(),
  size: z.number().positive().int(),
  minLevel: z.number(),
  maxLevel: z.number()
});
export type ArenaResponse = z.infer<typeof ArenaResponse>;

export const ArenaDetailsResponse = ArenaResponse.extend({
  heroes: ArenaHeroResponse.array()
});
export type ArenaDetailsResponse = z.infer<typeof ArenaDetailsResponse>;
