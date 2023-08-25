import { App } from "@tracer/node";
import { Plugin } from "vite";

export function vitePluginTracer(props: { app: App, isBuild?: boolean }): Plugin {
    const { app, isBuild } = props
    return {
        name: "vite-plugin-tracer",
        async config() {
            return {
                root: app.path.root(),
                base: app.base,
                mode: isBuild ? "development" : "production",
                publicDir: app.path.public(),
                cacheDir: app.path.cache(),
                resolve: {
                    alias: resolveAlias(app.path),
                }
                // TODO 
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