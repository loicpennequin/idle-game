import { z } from 'zod';

export const HeroResponse = z.object({
  id: z.string()
});
export type HeroResponse = z.infer<typeof HeroResponse>;
