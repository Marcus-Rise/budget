type OptionalPropertyNames<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>;
};

type Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type SpreadTwo<L, R> = Id<
  Pick<L, Exclude<keyof L, keyof R>> &
    Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>> &
    Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>> &
    SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>;

/**
 * @example
 * type Origin = {foo: 1, bar: true};
 * type New = {foo: true};
 * type Foo = Merge<[Origin, New]>
 * typeof Foo === {foo: true, bar: true};
 */
type Merge<A extends readonly [...any]> = A extends [infer L, ...infer R]
  ? SpreadTwo<L, Merge<R>>
  : unknown;

export type { Merge };
