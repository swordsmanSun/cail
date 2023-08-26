import { importPackageJson } from "@tracer/utils";
import { cwd } from "process";
import { join } from "path";
import { expect, test, describe } from "vitest";
import { resolveProjectOptions, resolvePathOptions, resolveServerOptions, resolveBuildOptions } from "../../src/app/resolveOptions";
import { readFileSync } from "fs";
import { createRequire } from "module";

describe('resolveProjectOptions', () => {
    test("empty params", async () => {
        expect(await resolveProjectOptions([], __dirname)).toEqual([
            {
                name: "app",
                type: "npm",
                path: "D:\\07_project\\19_字节青训营\\01_tracer\\packages\\node\\__test__\\app",
                packageModule: await importPackageJson(join(__dirname, "package.json")),
                children: [],
                dependencyTree: null,
                package: "package.json"
            }
        ])
    })
    test("single project", async () => {
        expect(await resolveProjectOptions([{
            name: "app222",
            type: "pnpm",
            path: __dirname,
        }])).toEqual([
            {
                name: "app222",
                type: "pnpm",
                path: __dirname,
                packageModule: await importPackageJson(join(__dirname, "package.json")),
                package: "package.json",
                children: [],
                dependencyTree: null
            }
        ])

    })
    test("deep project", async () => {
        expect(await resolveProjectOptions([{
            name: "app222",
            type: "pnpm",
            path: __dirname,
            package: "package.json",
            children: [
                {
                    path: __dirname,
                }
            ],
        }])).toEqual([
            {
                name: "app222",
                type: "pnpm",
                path: __dirname,
                packageModule: await importPackageJson(join(__dirname, "package.json")),
                dependencyTree: null,
                package: "package.json",
                children: [{
                    name: "app",
                    type: "npm",
                    path: __dirname,
                    packageModule: await importPackageJson(join(__dirname, "package.json")),
                    children: [],
                    dependencyTree: null,
                    package: "package.json"
                }],
            }
        ])
    })
})

describe("resolvePathOptions", () => {
    test("no params", () => {
        const dir = resolvePathOptions()
        expect(dir.temp()).toBe(join(cwd(), "./analysis/.temp/"))
        expect(dir.temp("test.json")).toBe(join(cwd(), "./analysis/.temp/test.json"))
    })
    test("has params", () => {
        const dir = resolvePathOptions({
            temp: __dirname
        })
        expect(dir.temp()).toBe(join(__dirname, "./analysis/.temp/"))
        expect(dir.temp("test/test.json")).toBe(join(__dirname, "./analysis/.temp/test/test.json"))
    })
})

describe("resolveServerOptions", () => {
    const defaultOptions = resolveServerOptions()
    test("default values", () => {
        expect(defaultOptions).toEqual({
            port: 3001,
            host: "127.0.0.1",
            open: true,
            template: "@tracer/client/templates/dev.html"
        })
    })
})

describe("resolveBuildOptions", () => {
    test("default values", () => {
        expect(resolveBuildOptions()).toEqual({
            template: "@tracer/client/templates/build.html"
        })
    })
    test("custom values", () => {
        expect(resolveBuildOptions({ template: "1" })).toEqual({
            template: "1"
        })
    })
})