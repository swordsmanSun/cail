import { App } from "@tracer/node";
import { DFSReduce } from "@tracer/utils";
import { join } from "path";
import { watch } from 'chokidar'
/**
 * watch the package.json file to rewrite the temporary file 
 * 
 * @param app App
 */
export function createPackageJsonWatcher(app: App) {
    const filesToWatch = DFSReduce(app.projects, (pre, cur) => [...pre, join(cur.path, cur.package)], [])

    const watcher = watch(filesToWatch, {
        ignoreInitial: true
    })

    watcher.on("change", async () => {
        await app.analyze()
        app.write()
    })

    return watcher
}
/**
 * watch the user config file change to restart dev server
 */
export function createUserConfigWatcher(app: App, restartServer: () => Promise<void>) {

}