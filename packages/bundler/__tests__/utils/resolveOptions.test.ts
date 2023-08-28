import { createApp, loadConfigObject } from "@tracer/node";
import { describe, expect, test } from "vitest";
import { resolveViteOptions } from "../../src/utils/resolveOptions";

describe("resolveViteOptions", async () => {
    const app = createApp(await loadConfigObject(__dirname))

    test("default params", () => {

        expect(resolveViteOptions({ app, bundlerConfigs: undefined, isBuild: true })).toMatchObject({
            plugins: [
                { name: 'vite:vue' },
                { name: 'vite-plugin-tracer' }
            ]
        })
    })

    test("custom params", () => {
        expect(resolveViteOptions({ app, bundlerConfigs: { vite: { chaiConfig: {} } }, isBuild: true })).toMatchObject({
            plugins: [
                { name: 'vite:vue' },
                { name: 'vite-plugin-tracer' }
            ],
            chaiConfig: {}
        })
    })
})