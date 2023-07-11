import type { Values } from '../../types/utils';
import type { TodoResponse } from './todo.schemas';

export const TODO_EVENTS = {
  TODO_CREATED: 'TODO_CREATED',
  TODO_UPDATED: 'TODO_UPDATED'
} as const;

export type TodoEvent = Values<typeof TODO_EVENTS>;

export type TodoIoEvents = {
  [TODO_EVENTS.TODO_CREATED]: (payload: TodoResponse) => void;
  [TODO_EVENTS.TODO_UPDATED]: (payload: TodoResponse) => void;
};
