type Cast<A, B> = A extends B ? A : B;
type TupleLast<T extends unknown[]> = T extends [...infer _, infer L] ? L : never;

declare function Pipe<Fns extends ((...args: unknown[]) => unknown)[]>(...fns: Fns): (...args: Parameters<Fns[0]>) => ReturnType<Cast<TupleLast<Fns>, (...args: unknown[]) => unknown>>;

export { Pipe };
