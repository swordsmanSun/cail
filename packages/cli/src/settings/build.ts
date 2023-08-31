import { createApp, chalk, loadConfigObject, runHook } from "@tracer/node";
import { tracerPluginOutput } from "@tracer/plugin-output"
export function setupBuild(ctx: CliContext) {
    const { program, dirname } = ctx

    program
        .command("build")
        .description("Build to static site")
        .action(async () => {
            const config = await loadConfigObject(dirname)
            // create app
            const app = createApp(config)
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