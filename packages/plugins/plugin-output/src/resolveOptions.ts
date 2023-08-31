import { cwd } from "process";
import { TracerPluginOutputOptionsPartial, TracerPluginOutputOptionsRequire } from "../types";
import { join } from "path";
import { App } from "@tracer/node";

export function resolveOptions(app: App, options: TracerPluginOutputOptionsPartial = {}) {
    options.outputs = options.outputs ?? [
        { type: "json", dir: join(app.path.root(), "tracer-output"), filename: "tracer-output" },
    ]

    return options as TracerPluginOutputOptionsRequire;
}