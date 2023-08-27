import { App, AppMethods, PluginFunction, PluginObject, PluginObjectUserSide } from "../../types/options"
import { chalk, debug } from "@tracer/utils"

const log = debug("@tracer/node:app")

// every plugin info management center
const pluginsObject = new WeakMap<PluginFunction, PluginObject>()
/**
 * current active plugin function
 */
let activePluginFunction: PluginFunction | undefined
export function getActivePlugin() {
    return activePluginFunction
}
/**
 * create use plugin method for tracer app
 * @param app app base data and utils
 * @returns use plugin method
 */
export function CreateUsePluginFunction(app: Omit<App, keyof AppMethods>) {
    const usePluginFn = (plugin: PluginFunction) => {
        // record the active plugin function
        activePluginFunction = plugin
        // call the plugin function
        plugin(app)
        const pluginObject = getPluginObject(plugin)
        if (!pluginObject?.name) {
             throw new Error("plugin must have a name")
        }
        log(`use plugin ${chalk.blue(pluginObject.name)}`)
        return app
    }
    return usePluginFn
}
/**
 * define the plugin info, the call to this function mus be inside the plugin function
 * @param pluginObject plugin object
 */
export function defineOptions(pluginObject: PluginObjectUserSide) {
    if (!activePluginFunction) {
        throw new Error("defineOptions must be called inside the plugin function")
    }
    let _pluginObject = pluginsObject.get(activePluginFunction)
    if (!_pluginObject) {
        const temp = { ...pluginObject }
        pluginsObject.set(getActivePlugin(), temp)
        _pluginObject = temp
    }
    Object.keys(pluginObject).forEach(key => {
        _pluginObject[key] = pluginObject[key]
    })
}
export function getPluginObject(pluginFunction: PluginFunction) {
    return pluginsObject.get(pluginFunction)
}