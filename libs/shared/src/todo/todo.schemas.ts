import { z } from "zod";

export const TodoResponse = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean(),
});
export type TodoResponse = z.infer<typeof TodoResponse>;

export const CreateTodoDto = z.object({
  text: z.string(),
});
export type CreateTodoDto = z.infer<typeof CreateTodoDto>;
