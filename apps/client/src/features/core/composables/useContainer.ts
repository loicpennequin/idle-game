import type { InjectionKey } from 'vue';
import type { Container } from '../interfaces/container';

export const CONTAINER_INJECTION_KEY = Symbol('container') as InjectionKey<Container>;

export const useContainer = () => useSafeInject(CONTAINER_INJECTION_KEY);
