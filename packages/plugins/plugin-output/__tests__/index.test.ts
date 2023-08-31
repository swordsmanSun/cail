import { createApp } from "@tracer/node";
import { join } from "path";
import { describe, expect, test } from "vitest";
import { tracerPluginOutput } from "../src";
import { existsSync, unlinkSync } from "fs";

describe("tracerPluginOutput", () => {

    test("default options", () => {
        const app = createApp({
            plugins: [
                tracerPluginOutput()
            ]
        }, join(__dirname, "npmProject"))

        app.init()

        const filePath = join(__dirname, "npmProject/analysis/tracer-output/tracer-output.json")
        // exist this file
        expect(existsSync(filePath)).toBe(true)
        // remove the file
        if (existsSync(filePath)) {
            unlinkSync(filePath)
        }
    })

    test("multiple outputs", () => {
        const outputDir = join(__dirname, "npmProject/analysis/tracer-output")
        const app = createApp({
            plugins: [
                tracerPluginOutput({
                    outputs: [
                        { type: "json", dir: outputDir, filename: "tracer-output" },
                        { type: "js", dir: outputDir, filename: "tracer-output" },
                        { type: "ts", dir: outputDir, filename: "tracer-output" }
                    ]
                })
            ]
        }, join(__dirname, "npmProject"))

        app.init()

        expect(existsSync(join(outputDir, "tracer-output.js"))).toBe(true)
        expect(existsSync(join(outputDir, "tracer-output.ts"))).toBe(true)

        // remove the file
        if (existsSync(join(outputDir, "tracer-output.js"))) {
            unlinkSync(join(outputDir, "tracer-output.js"))
        }
        if (existsSync(join(outputDir, "tracer-output.ts"))) {
            unlinkSync(join(outputDir, "tracer-output.ts"))
        }
        if (existsSync(join(outputDir, "tracer-output.json"))) {
            unlinkSync(join(outputDir, "tracer-output.json"))
        }
    })
})