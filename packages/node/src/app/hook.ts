import { Hooks } from "../../types";

const hooks = {
    analyzing: [] as Hooks["analyzing"][],
    watching: [] as Hooks["watching"][],
    analyzed: [] as Hooks["analyzed"][],
    generated: [] as Hooks["generated"][],
}

export function runHook<N extends keyof typeof hooks>(name: N, ...args: Parameters<Hooks[N]>) {
    for (const hook of hooks[name]) {
        // @ts-ignore
        hook(...args)
    }
}

export function onAnalyzing(fn: Hooks["analyzing"]) {
    hooks.analyzing.push(fn)
}
export function onWatching(fn: Hooks["watching"]) {
    hooks.watching.push(fn)
}
export function onAnalyzed(fn: Hooks["analyzed"]) {
    hooks.analyzed.push(fn)
}
export function onGenerated(fn: Hooks["generated"]) {
    hooks.generated.push(fn)
}