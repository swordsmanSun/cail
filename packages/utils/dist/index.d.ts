type Cast<A, B> = A extends B ? A : B;
type UnionToInterFunction<U> = (U extends any ? (x: () => U) => unknown : never) extends (x: infer A) => unknown ? A : never;
type UnionLast<U> = UnionToInterFunction<U> extends () => infer A ? A : never;
type TupleTails<T extends unknown[], Indexes extends unknown[] = [], Tails extends unknown[] = []> = Indexes["length"] extends UnionLast<T["length"]> ? Tails : TupleTails<T, [...Indexes, T[Indexes["length"]]], Indexes["length"] extends 0 ? [] : [...Tails, T[Indexes["length"]]]>;
type UnNameTuple<T extends unknown[], Un extends unknown[] = []> = T["length"] extends 0 ? Un : UnNameTuple<TupleTails<T>, [...Un, T[0]]>;
type And<T1 extends boolean, T2 extends boolean> = T1 extends true ? (T2 extends true ? true : false) : false;
type Or<T1 extends boolean, T2 extends boolean> = T1 extends true ? true : T2 extends true ? true : false;
type Is<T, R> = T extends R ? true : false;
type Not<T, R> = T extends R ? false : true;
type TupleSlice<T extends unknown[], S extends number, E extends number = T["length"], Subs extends unknown[] = [], Res extends unknown[] = [], isInnerRange extends boolean = And<Not<Subs["length"], E>, Is<Subs["length"], S>>> = T["length"] extends 0 ? Res : TupleSlice<TupleTails<T>, S, E, [
    ...Subs,
    T[0]
], isInnerRange extends true ? [...Res, T[0]] : Res, And<Not<[...Subs, T[0]]["length"], E>, Or<Is<isInnerRange, true>, Is<[...Subs, T[0]]["length"], S>>>>;
type TupleFirst<T> = T extends [infer F, ...infer _] ? F : never;
type TupleLast<T extends unknown[]> = T extends [...infer _, infer L] ? L : never;

declare function Pipe<Fns extends ((...args: unknown[]) => unknown)[]>(...fns: Fns): (...args: Parameters<Fns[0]>) => ReturnType<Cast<TupleLast<Fns>, (...args: unknown[]) => unknown>>;

declare function withDefault<T, D>(value: T, defaultValue: D): T;

type TreeTraverseContext<N> = {
    depth: number;
    parent?: N;
    childIndex?: number;
};

/**
 * Perform the specified action for each node in the tree or forest using depth-first search
 * @param tree Tree or forest
 * @param callbackFn A function that accepts up two arguments. DFS calls the callbackfn function one time for each node in the tree or forest.
 * @param props Props.children is the name of the children property
 */
declare function DFS<T>(node: T, callbackFn: (node: T, context: TreeTraverseContext<T>) => number | string | boolean | void | undefined | null | ((node: T, context: TreeTraverseContext<T>) => void), props?: {
    children?: string;
}, context?: TreeTraverseContext<T>): void;
/**
 * Perform the specified action for each node in the tree or forest using breadth-first search
 * @param tree Tree or forest
 * @param callbackFn A function that accepts up two arguments. DFS calls the callbackfn function one time for each node in the tree or forest.
 * @param props Props.children is the name of the children property
 */
declare function BFS<T>(tree: T | T[], callbackFn: (node: T, depth: number) => any, props?: {
    children?: string;
}): void;
/**
 * Perform the specified action for each node in the tree or forest using depth-first search.
 * The return value of the callback function is the accumulated result, and it is provided as an argument in the next call to the callback function.
 * @param tree Tree or forest
 * @param callbackFn  A function that accepts up one arguments. DFS calls the callbackfn function one time for each node in the tree or forest.
 * @param initialValue If initial value is specified, it is used as the initial value to start the accumulation.
 * @param props Props.children is the name of the children property
 * @returns The accumulated result
 */
declare function DFSReduce<T, R, I = undefined>(tree: T, callbackFn: (previousValue: I extends undefined ? Record<any, any> : I, currentValue: T, context: TreeTraverseContext<T>) => R, initialValue?: I, props?: {
    children?: string;
}): I extends undefined ? R : I;
/**
 * Get the depth of the tree
 * @param tree tree
 * @param props Props.children is the name of the children property
 * @returns The depth of the tree
 */
declare function treeDepth<T>(tree: T, props?: {
    children?: string;
}): number;

export { And, BFS, Cast, DFS, DFSReduce, Is, Not, Or, Pipe, TreeTraverseContext, TupleFirst, TupleLast, TupleSlice, TupleTails, UnNameTuple, UnionLast, UnionToInterFunction, treeDepth, withDefault };
