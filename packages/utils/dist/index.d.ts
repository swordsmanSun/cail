declare function Pipe<Fns extends ((...args: unknown[]) => unknown)[]>(...fns: Fns): (...args: Parameters<Fns[0]>) => ReturnType<Cast<TupleLast<Fns>, (...args: unknown[]) => unknown>>;

export { Pipe };
