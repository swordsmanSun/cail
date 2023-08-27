import { describe, expect, test } from "vitest";
import { createPackageJsonWatcher } from "../../../src/utils/createWatchers";
import { App, createApp } from "@tracer/node";


describe("createPackageJsonWatcher", async () => {
    const app = await createApp({}, __dirname)


    test("createPackageJsonWatcher", () => {
        // TODO add test case
        createPackageJsonWatcher(app)
    })
})