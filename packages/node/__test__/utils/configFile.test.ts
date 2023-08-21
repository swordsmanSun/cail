import { join } from "path";
import { expect, test } from "vitest";
import { getConfigFilePath, importConfigFile, loadConfigModule, loadConfigObject } from "../../src/utils";

test("getConfigFilePath", () => {
    expect(getConfigFilePath(__dirname)).toBe(join(__dirname, "tracer.config.ts"))
})
test("importConfigFile", async () => {
    expect(await importConfigFile(join(__dirname, "tracer.config.ts"))).toMatchObject({
        default: {
            base: "/"
        }
    })
})
test("loadConfigModule", async () => {
    expect(await loadConfigModule(__dirname)).toMatchObject({
        default: {
            base: "/"
        }
    })
})
test("loadConfigObject", async () => {
    expect(await loadConfigObject(__dirname)).toEqual({
        base: "/"
    })
})