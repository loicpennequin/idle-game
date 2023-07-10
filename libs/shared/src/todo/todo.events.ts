import type { TodoResponse } from './todo.schemas';

export const TODO_EVENTS = {
  TODO_CREATED: 'TODO_CREATED',
  TODO_UPDATED: 'TODO_UPDATED'
} as const;

export type TodoIoEvents = {
  [TODO_EVENTS.TODO_CREATED]: (payload: TodoResponse) => void;
  [TODO_EVENTS.TODO_UPDATED]: (payload: TodoResponse) => void;
};
