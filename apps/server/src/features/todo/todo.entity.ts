import { UUID } from '@daria/shared';

export type TodoId = UUID;

export type Todo = {
  id: TodoId;
  text: string;
  completed: boolean;
};
