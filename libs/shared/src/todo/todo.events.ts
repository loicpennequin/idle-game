import type { TodoResponse } from './todo.schemas';

export const TODO_EVENTS = {
  TODO_CREATED: 'TODO_CREATED'
} as const;

export type TodoIoEvents = {
  [TODO_EVENTS.TODO_CREATED]: (payload: TodoResponse) => void;
};
