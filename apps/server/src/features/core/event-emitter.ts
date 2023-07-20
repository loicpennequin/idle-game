import EventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import { ArenaEvents } from '../arena/arena.events';

export type DomainEvents = ArenaEvents;

export type Emitter = TypedEmitter<DomainEvents>;

export const emitter = new EventEmitter() as TypedEmitter<DomainEvents>;
emitter.setMaxListeners(100);
