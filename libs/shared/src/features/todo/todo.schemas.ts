import { z } from 'zod';

export const TodoResponse = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean()
});
export type TodoResponse = z.infer<typeof TodoResponse>;
