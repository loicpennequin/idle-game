export const execute = <T extends () => any>(fn: T): ReturnType<T> => fn();
