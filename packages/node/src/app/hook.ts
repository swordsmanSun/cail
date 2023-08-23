import { Hooks } from "../../types/hook";
// Global hook management center
const hooks = {
    analyzing: [] as Hooks["analyzing"][],
    analyzed: [] as Hooks["analyzed"][],
    initialized: [] as Hooks["initialized"][],
    temped: [] as Hooks["temped"][],
    watching: [] as Hooks["watching"][],
    built: [] as Hooks["built"][],
}
export function runHook<N extends keyof typeof hooks>(name: N, ...args: Parameters<Hooks[N]>) {
    for (const hook of hooks[name]) {
        // @ts-ignore
        hook(...args)
    }
}
export function onTemped(fn: Hooks["temped"]) {
    hooks.temped.push(fn)
}
export function onAnalyzing(fn: Hooks["analyzing"]) {
    hooks.analyzing.push(fn)
}
export function onAnalyzed(fn: Hooks["analyzed"]) {
    hooks.analyzed.push(fn)
}
export function onBuilt(fn: Hooks["built"]) {
    hooks.built.push(fn)
}
export function onWatching(fn: Hooks["watching"]) {
    hooks.watching.push(fn)
}
export function onInitialized(fn: Hooks["initialized"]) {
    hooks.initialized.push(fn)
}