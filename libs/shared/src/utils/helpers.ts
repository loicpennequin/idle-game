import type { AnyFunction, Gradual, Slice } from '../types/utils';

export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const identity = <T>(arg: T) => arg;

export type Curry<
  Function extends AnyFunction,
  Length extends number = Parameters<Function>['length']
> = <Args extends Gradual<Parameters<Function>>>(
  ...args: Args
) => Args['length'] extends Length
  ? ReturnType<Function>
  : Curry<(...args: Slice<Parameters<Function>, Args['length']>) => ReturnType<Function>>;

export function curry<
  Function extends AnyFunction,
  Length extends number = Parameters<Function>['length']
>(fn: Function, length = fn.length as Length): Curry<Function, Length> {
  return <A extends Gradual<Parameters<Function>>>(...args: A) => {
    const argsLength = args.length;

    if (argsLength === length) {
      return fn(...args);
    }

    if (argsLength > length) {
      return fn(...args.slice(0, length));
    }

    return curry((...nextArgs) => fn(...args.concat(nextArgs)), length - argsLength);
  };
}
