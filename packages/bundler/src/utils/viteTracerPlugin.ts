import { App } from "@tracer/node";
import { readFileSync } from "fs";
import { Plugin } from "vite";

export function vitePluginTracer(props: { app: App, isBuild?: boolean }): Plugin {
    const { app, isBuild } = props
    return {
        name: "vite-plugin-tracer",
        async config() {
            // write index.html as a entry point
            app.writeTemp("../index.html", readFileSync(app.server.template).toString())

            return {
                root: app.path.root(),
                base: app.base,
                mode: isBuild ? "development" : "production",
                publicDir: app.path.public(),
                cacheDir: app.path.cache(),
                resolve: {
                    alias: resolveAlias(app.path),
                },
                server: {
                    host: app.server.host,
                    port: app.server.port,
                    open: app.server.open
                },
                build: {
                    outDir: app.path.out()
                }
            }
        }
    }
}
/**
 * Resolve vite config `resolve.alias`
 */
export function resolveAlias(path: App["path"]) {
    const sysAlias = Object.keys(path).map(key => ({
        find: `@${key}`,
        replacement: path[key]()
    }))
    return [
        ...sysAlias
    ]
}