import { describe, expect, test, vi } from "vitest";
import { onAnalyzed, onAnalyzing, onGenerated, onWatching, runHook } from "../../src/app/hook";

describe("hook", () => {
    const hooks = {
        analyzing: onAnalyzing,
        watching: onWatching,
        analyzed: onAnalyzed,
        generated: onGenerated
    }
    Object.keys(hooks).forEach(hookName => {
        const hook = hooks[hookName as keyof typeof hooks]
        test(hook.name, () => {
            const fn = vi.fn()
            hook(fn)
            runHook(hookName as keyof typeof hooks)
            expect(fn).toBeCalledTimes(1)
        })
    })
})