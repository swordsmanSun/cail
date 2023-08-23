import { expect, test, vi } from "vitest";
import { CreateWriteTemp } from "../../src/app/createOptions";
import { resolvePathOptions } from "../../src/app/resolveOptions";
import { readFileSync, unlinkSync } from "fs";
import { join } from "path";
import { CreateUsePluginFunction } from "../../src/app/plugin";

test("createWriteTemp", () => {
    const path = resolvePathOptions({
        temp: __dirname
    })
    const writeTemp = CreateWriteTemp(path)
    writeTemp("name.js", "test")
    expect(readFileSync(join(path.temp(), "name.js")).toString()).toBe("test")
    unlinkSync(join(path.temp(), "name.js"))
})

test("CreateUsePlugin", () => {
    const plugin = vi.fn()
    const use = CreateUsePluginFunction(1 as any)
    expect(() => use(plugin)).toThrowError("plugin must have a name")
})