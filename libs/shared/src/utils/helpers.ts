export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const identity = <T>(arg: T) => arg;
