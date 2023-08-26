import { createApp, loadConfigObject } from "@tracer/node"
import { tracerPluginOutput } from "@tracer/plugin-output"
import type { FSWatcher } from 'chokidar'
import { createPackageJsonWatcher, createUserConfigWatcher } from "../utils/createWatchers"

export function setupDev(ctx: CliContext) {
    const { program, dirname } = ctx

    program
        .command("dev")
        .description("dev to static site")
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

            const closeServer = await app.bundler.dev(app)
            const restartServer = async () => {

            }

            const pkgJsonWatcher = createPackageJsonWatcher(app)
            const userConfigWatcher = createUserConfigWatcher(app, restartServer)
        })
}