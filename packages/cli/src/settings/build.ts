import { createApp } from "@tracer/node";
import { loadConfigObject, runHook } from "@tracer/node"
import { tracerPluginOutput } from "@tracer/plugin-output"
import { chalk } from "@tracer/utils"
export function setupBuild(ctx: CliContext) {
    const { program, dirname } = ctx

    program
        .command("build")
        .description("Build to static site")
        .action(async () => {
            const config = await loadConfigObject(dirname)
            // create app
            const app = await createApp(config)
            // TODO  use the official plugins
            app.use(tracerPluginOutput())
            // init
            app.init()
            // write temp
            app.write()
            // build

            // run built hook
            runHook("built")

            console.log(chalk.green("tracer build success"))
        })
}