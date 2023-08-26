import { describe, expect, test } from "vitest";
import { createPackageJsonWatcher } from "../../src/utils/createWatchers";
import { App } from "@tracer/node";


describe("createPackageJsonWatcher", () => {
    test("createPackageJsonWatcher", () => {
        createPackageJsonWatcher({
            projects: [{
                path: "xxx1",
                package: "package.json",
                children: [
                    {
                        path: "xxx2",
                        package: "package.json"
                    },
                    {
                        path: "xxx3",
                        package: "package.json"
                    }
                ]
            },
            {
                path: "xxx4",
                package: "package.json"
            }]
        } as App)
    })
})