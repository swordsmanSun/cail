import { importPackageJson } from "@tracer/utils";
import { cwd } from "process";
import { join } from "path";
import { expect, test, describe } from "vitest";
import { resolveProjectOptions, resolvePathOptions } from "../../src/app/resolveOptions";

describe('resolveProjectOptions', () => {
    test("empty params", async () => {
        expect(await resolveProjectOptions([], __dirname)).toEqual([
            {
                name: "app",
                type: "npm",
                path: "D:\\07_project\\19_字节青训营\\01_tracer\\packages\\node\\__test__\\app",
                packageModule: await importPackageJson(join(__dirname, "package.json")),
                children: [],
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
                children: [],
            }
        ])

    })
    test("deep project", async () => {
        expect(await resolveProjectOptions([{
            name: "app222",
            type: "pnpm",
            path: __dirname,
            children: [
                {
                    path: __dirname,
                }
            ]
        }])).toEqual([
            {
                name: "app222",
                type: "pnpm",
                path: __dirname,
                packageModule: await importPackageJson(join(__dirname, "package.json")),
                children: [{
                    name: "app",
                    type: "npm",
                    path: __dirname,
                    packageModule: await importPackageJson(join(__dirname, "package.json")),
                    children: []
                }],
            }
        ])
    })
})

describe("resolvePathOptions", () => {
    test("no params", () => {
        const dir = resolvePathOptions()
        expect(dir.temp()).toBe(join(cwd(), "./.analyzer/temp"))
        expect(dir.temp("test.json")).toBe(join(cwd(), "./.analyzer/temp/test.json"))
    })
    test("has params", () => {
        const dir = resolvePathOptions({
            temp: __dirname
        })
        expect(dir.temp()).toBe(join(__dirname, "./.analyzer/temp"))
        expect(dir.temp("test/test.json")).toBe(join(__dirname, "./.analyzer/temp/test/test.json"))
    })
})