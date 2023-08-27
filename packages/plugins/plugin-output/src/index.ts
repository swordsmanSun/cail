import { App, defineOptions } from "@tracer/node"

export function tracerPluginOutput() {
    return (app: App) => {
        defineOptions({
            name: "tracer-plugin-output"
        })
    }
}