import { join } from "path";
import { expect, test } from "vitest";
import { importJson, importModule, importPackageJson, packageJsonDefault } from "../../src/module/importModule";

test("importModule", async () => {
    expect(await importModule(join(__dirname, "./importModule.js"))).toMatchObject({
        test: 2,
        default: 2
    })
    expect(await importModule(join(__dirname, "./importModule.json"))).toMatchObject({
        default: {
            test: 2,
        },
    })
    expect(await importModule(join(__dirname, "./importModule.text"))).toMatchObject({
        test: 2,
        default: 2
    })
})

test("importPackageJson", async () => {
    expect(await importPackageJson(join(__dirname, "./importModule.json"))).toEqual({
        ...packageJsonDefault(),
        test: 2
    })
})

test("importJson", () => {
    expect(importJson(join(__dirname, "./importModule.json"))).toEqual({
        test: 2
    })
})