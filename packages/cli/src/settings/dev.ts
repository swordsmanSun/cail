import { createApp, loadConfigObject } from "@tracer/node"
import { tracerPluginOutput } from "@tracer/plugin-output"
import { createPackageJsonWatcher, createUserConfigWatcher } from "../utils/createWatchers"

export function setupDev(ctx: CliContext) {
    const { program, dirname } = ctx

    program
        .command("dev")
        .description("dev to static site")
        .action(async function dev() {
            const config = await loadConfigObject(dirname)
            // create app
            const app = await createApp(config)
            // TODO  use the official plugins
            app.use(tracerPluginOutput())
            // init
            app.init()
            // write temp
            app.write()

            const closeServer = await app.bundler.dev(app)
            const restartServer = async () => {
                await Promise.all([
                    ...watchers.map(watcher => watcher.close()),
                    closeServer
                ])
                await dev()
            }

            const watchers = [
                createPackageJsonWatcher(app),
                createUserConfigWatcher(app, restartServer)
            ]
        })
}