import { App, defineOptions, onAnalyzed, onAnalyzing } from "@tracer/node"
import { TracerPluginOutputOptionsPartial } from "../types"
import { resolveOptions } from "./resolveOptions"
import { join } from "path"
import { outputFileSync } from "fs-extra"

export function tracerPluginOutput(options?: Partial<TracerPluginOutputOptionsPartial>) {
    return (app: App) => {
        defineOptions({
            name: "tracer-plugin-output"
        })

        const optionsRequire = resolveOptions(app, options)
        
        onAnalyzed((project) => {
            optionsRequire.outputs.forEach(output => {
                const outputFile = (content: string) => {
                    outputFileSync(join(output.dir, output.filename + '.' + output.type), content)
                }

                if (output.type === "json") {
                    outputFile(`${JSON.stringify(project.dependencyTree, null, 4)}`)
                } else if (output.type === "js") {
                    outputFile(`export default JSON.parse(${JSON.stringify(project.dependencyTree, null, 4)})`)
                } else if (output.type === "ts") {
                    outputFile(`export default JSON.parse(${JSON.stringify(project.dependencyTree, null, 4)})`)
                }
            })
        })
    }
}

export * from "../types"