import { expect, test } from "vitest";
import { CreateUsePluginFunction, defineOptions, getPluginObject } from "../../src/app/plugin";

test("defineOptions", () => {
    const usePluginFunction = CreateUsePluginFunction(1 as any)
    const pluginFunction = () => {
        defineOptions({
            name: "tracer-plugin-xxx"
        })
    }
    usePluginFunction(pluginFunction)

    expect(getPluginObject(pluginFunction)).toEqual({
        name: "tracer-plugin-xxx"
    })
})