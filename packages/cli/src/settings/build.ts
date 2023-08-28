import { createApp, chalk, loadConfigObject, runHook } from "@tracer/node";
import { tracerPluginOutput } from "@tracer/plugin-output"
export function setupBuild(ctx: CliContext) {
    const { program, dirname } = ctx

    program
        .command("build")
        .description("Build to static site")
        .action(async () => {
            const config = await loadConfigObject(dirname)
            console.log(0);
            // create app
            const app = createApp(config)
            console.log(1);

            // TODO  use the official plugins
            app.use(tracerPluginOutput())
            console.log(2);
            // init
            app.init()
            console.log(3);
            // write temp
            app.write()
            // build
            console.log(4);

            // run built hook
            runHook("built")

            console.log(chalk.green("tracer build success"))
        })
}