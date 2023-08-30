import { App } from "@tracer/node";
import { DFSReduce } from "@tracer/utils";
import { join } from "path";
import { watch } from 'chokidar'
import { cwd } from "process";
/**
 * watch the package.json file to rewrite the temporary file 
 * 
 * @param app App
 */
export function createPackageJsonWatcher(app: App) {
    const { projects, analyze, write } = app

    const filesToWatch = projects.reduce((pre, project) => [...pre, DFSReduce(project, (pre, cur) => [...pre, join(cur.path, cur.package)], [])], [])

    const watcher = watch(filesToWatch, {
        ignoreInitial: true
    })

    watcher.on("change", async () => {
        await analyze()
        write()
    })

    return watcher
}
/**
 * watch the user config file change to restart dev server
 */
export function createUserConfigWatcher(app: App, restartServer: () => Promise<void>) {
    // TODO more than ts files
    const configPath = join(cwd(), "tracer.config.ts")

    const watcher = watch(configPath, {
        ignoreInitial: true
    })

    watcher.on("change", async () => {
        await restartServer()
    })

    return watcher
}