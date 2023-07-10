import type { AnyFunction, Gradual, Slice } from '../types/utils';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';

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

export const encase =
  <TRight, TLeft, TArgs extends any[]>(errorMapper: (err: unknown) => TLeft) =>
  (fn: (...args: TArgs) => TRight) =>
  (...args: TArgs): E.Either<TLeft, TRight> => {
    try {
      return E.right(fn(...args));
    } catch (e) {
      return E.left(errorMapper(e));
    }
  };

// export const encaseAsync =
//   <TRight, TLeft, TArgs extends any[]>(
//     fn: (...args: TArgs) => Promise<TRight>,
//     errorMapper: (err: unknown) => TLeft
//   ) =>
//   (...args: TArgs): TE.TaskEither<TLeft, TRight> => {
//     try {
//       return TE.right(await fn(...args));
//     } catch (e) {
//       return TE.left(errorMapper(e));
//     }
//   };
