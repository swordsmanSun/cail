export type Cast<A, B> = A extends B ? A : B;
export type UnionToInterFunction<U> = (U extends any ? (x: () => U) => unknown : never) extends (x: infer A) => unknown ? A : never;
export type UnionLast<U> = UnionToInterFunction<U> extends () => infer A ? A : never;
export type TupleTails<T extends unknown[], Indexes extends unknown[] = [], Tails extends unknown[] = []> = Indexes["length"] extends UnionLast<T["length"]>
    ? Tails
    : TupleTails<T, [...Indexes, T[Indexes["length"]]], Indexes["length"] extends 0 ? [] : [...Tails, T[Indexes["length"]]]>;

export type UnNameTuple<T extends unknown[], Un extends unknown[] = []> = T["length"] extends 0 ? Un : UnNameTuple<TupleTails<T>, [...Un, T[0]]>;

export type And<T1 extends boolean, T2 extends boolean> = T1 extends true ? (T2 extends true ? true : false) : false;
export type Or<T1 extends boolean, T2 extends boolean> = T1 extends true ? true : T2 extends true ? true : false;
export type Is<T, R> = T extends R ? true : false;
export type Not<T, R> = T extends R ? false : true;

export type TupleSlice<
    T extends unknown[],
    S extends number,
    E extends number = T["length"],
    Subs extends unknown[] = [],
    Res extends unknown[] = [],
    isInnerRange extends boolean = And<Not<Subs["length"], E>, Is<Subs["length"], S>>
    > = T["length"] extends 0
    ? Res
    : TupleSlice<
        TupleTails<T>,
        S,
        E,
        [...Subs, T[0]],
        isInnerRange extends true ? [...Res, T[0]] : Res,
        And<Not<[...Subs, T[0]]["length"], E>, Or<Is<isInnerRange, true>, Is<[...Subs, T[0]]["length"], S>>>
    >;
export type TupleFirst<T> = T extends [infer F, ...infer _] ? F : never;
export type TupleLast<T extends unknown[]> = T extends [...infer _, infer L] ? L : never;