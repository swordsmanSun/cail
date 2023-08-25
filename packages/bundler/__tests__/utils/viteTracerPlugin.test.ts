import { expect, test } from "vitest";
import { resolveAlias } from "../../src/utils/viteTracerPlugin";
import { resolvePathOptions } from "@tracer/node";
import { join } from "path";


test("resolveAlias", () => {
    const path = resolvePathOptions({}, __dirname)
    expect(resolveAlias(path)).toEqual([
        {
            "find": "@root",
            "replacement": join(__dirname, "analysis/"),
        },
        {
            "find": "@temp",
            "replacement": join(__dirname, "analysis/.temp/"),
        },
        {
            "find": "@out",
            "replacement": join(__dirname, "analysis/dist/"),
        },
        {
            "find": "@cache",
            "replacement": join(__dirname, "analysis/.cache/"),
        },
        {
            "find": "@public",
            "replacement": join(__dirname, "analysis/public/"),
        },
    ])
})