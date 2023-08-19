export function Pipe<Fns extends ((...args: unknown[]) => unknown)[]>(...fns: Fns) {
    return (...args: Parameters<Fns[0]>) =>
        fns.reduce((arg, fn) => arg.length ? fn(...arg) : fn(arg), args) as
        ReturnType<Cast<TupleLast<Fns>, (...args: unknown[]) => unknown>>;
}