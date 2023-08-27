import { importPackageJson } from "@tracer/utils";
import { cwd } from "process";
import { join, normalize, sep } from "path";
import { expect, test, describe } from "vitest";
import { resolveProjectOptions, resolvePathOptions, resolveServerOptions, resolveBuildOptions } from "../../src/app/resolveOptions";

describe('resolveProjectOptions', () => {
    test("empty params", () => {
        expect(resolveProjectOptions([], __dirname)).toEqual([
            {
                name: "app",
                type: "npm",
                path: "D:/07_project/19_字节青训营/01_tracer/packages/node/__test__/app",
                packageModule: importPackageJson(join(__dirname, "package.json")),
                children: [],
                dependencyTree: null,
                package: "package.json"
            }
        ])
    })
    test("single project", () => {
        expect(resolveProjectOptions([{
            name: "app222",
            type: "pnpm",
            path: __dirname.split(sep).join("/"),
        }])).toEqual([
            {
                name: "app222",
                type: "pnpm",
                path: __dirname.split(sep).join("/"),
                packageModule: importPackageJson(join(__dirname, "package.json")),
                package: "package.json",
                children: [],
                dependencyTree: null
            }
        ])

    })
    test("deep project", () => {
        expect(resolveProjectOptions([{
            name: "app222",
            type: "pnpm",
            path: __dirname.split(sep).join("/"),
            package: "package.json",
            children: [
                {
                    path: __dirname.split(sep).join("/"),
                }
            ],
        }])).toEqual([
            {
                name: "app222",
                type: "pnpm",
                path: __dirname.split(sep).join("/"),
                packageModule: importPackageJson(join(__dirname, "package.json")),
                dependencyTree: null,
                package: "package.json",
                children: [{
                    name: "app",
                    type: "npm",
                    path: __dirname.split(sep).join("/"),
                    packageModule: importPackageJson(join(__dirname, "package.json")),
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
        expect(dir.temp()).toBe(join(cwd(), "./analysis/.temp"))
        expect(dir.temp("test.json")).toBe(join(cwd(), "./analysis/.temp/test.json"))
    })
    test("has params", () => {
        const dir = resolvePathOptions({
            temp: __dirname
        })
        expect(dir.temp()).toBe(join(__dirname, "./analysis/.temp"))
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
            template: join(cwd(), "node_modules", "@tracer/client/templates/dev.html")
        })
    })
})

describe("resolveBuildOptions", () => {
    test("default values", () => {
        expect(resolveBuildOptions()).toEqual({
            template: join(cwd(), "node_modules", "@tracer/client/templates/build.html")
        })
    })
    test("custom values", () => {
        expect(resolveBuildOptions({ template: "1" })).toEqual({
            template: "1"
        })
    })
})