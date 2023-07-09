export type Nullable<T> = T | null | undefined;
export type NonNullable<T> = Exclude<T, undefined | null>;
export type PartialBy<T, K extends keyof T = never> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Point = { x: number; y: number };
export type Size = { w: number; h: number };
export type Boundaries<T = number> = { min: T; max: T };
export type Range = Boundaries<number>;
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T];
export type Matrix<T> = T[][];
export type AnyObject = { [key: string]: any };
export type AnyFunction = (...args: any[]) => any;
export type Keys<T> = keyof T;
export type Values<T> = T[keyof T];
export type Override<A, B> = Omit<A, keyof B> & B;
export type Mutable<T> = { -readonly [Key in keyof T]: T[Key] };
export type Constructor<T = AnyObject> = new (...args: any[]) => T;
export type AnyConstructor = Constructor<AnyObject>;
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;
export type MaybePromise<T> = T | Promise<T>;

export type ApiError = {
  message: string;
  kind: string;
  statusCode: number;
  meta: Nullable<AnyObject>;
};
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Tuple<L extends number, T extends any[] | readonly any[] = []> = T extends {
  length: L;
}
  ? T
  : Tuple<L, [...T, any]>;

export type Gradual<T extends any[] | readonly any[]> = T extends [...infer R, any]
  ? R['length'] extends 0
    ? T
    : T | Gradual<R>
  : T;

export type Slice<
  T extends any[] | readonly any[],
  C extends number
> = T['length'] extends C
  ? T
  : T extends readonly [...Tuple<C>, ...infer S]
  ? S
  : T extends [...Tuple<C>, ...infer S]
  ? S
  : T;
