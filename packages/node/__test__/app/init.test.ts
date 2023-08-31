import { describe, expect, test, vi } from "vitest";
import { initApp } from "../../src/app/init";
import { App } from "../../types/options";
import { resolveProjectOptions } from "../../src/app/resolveOptions";
import { CreateUsePluginFunction, defineOptions } from "../../src/app/plugin";
import { onAnalyzed, onAnalyzing, onBuilt, onInitialized, onTemped, onWatching } from "../../src/app/hook";
import { join } from "path";
import { CreateAnalyze } from "../../src/app/createOptions";
import { importPackageJson } from "../../src/utils/importModule";

describe("init", async () => {
    let projects: any
    let project: any
    const fn = vi.fn()
    const app = {
        plugins: [() => {
            defineOptions({
                name: "xxx"
            })
            onAnalyzing(fn)
            onAnalyzed((_project) => (project = _project, fn()))
            onInitialized((_projects) => (projects = _projects, fn()))
            // the following hooks will not be called
            onTemped(fn)
            onBuilt(fn)
            onWatching(fn)
        }],
        projects: resolveProjectOptions([], __dirname),
        use: CreateUsePluginFunction(1 as any)
    } as unknown as App
    app.analyze = CreateAnalyze(app.projects)
    await initApp(app)
    const correctProject = {
        name: "app",
        type: "npm",
        path: "D:/07_project/19_字节青训营/01_tracer/packages/node/__test__/app",
        packageModule: importPackageJson(join(__dirname, "package.json")),
        children: [],
        dependencyTree: [],
        package: "package.json"
    }
    test("the correct times of calls", () => expect(fn).toBeCalledTimes(2))
    test("the correct params of onInitialized function", () => {
        expect(projects).toEqual([correctProject])
    })
    test("the correct params of onAnalyzed function", () => {
        expect(project).toEqual(correctProject)
    })
})