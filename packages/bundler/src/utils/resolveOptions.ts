import vuePlugin from '@vitejs/plugin-vue'
import { App } from "@tracer/node";
import { BundlerConfigs } from "../../types/options";
import { InlineConfig, mergeConfig } from 'vite'
import { vitePluginTracer } from './viteTracerPlugin';

export function resolveViteOptions(props: { app: App, bundlerConfigs?: BundlerConfigs, isBuild?: boolean }): InlineConfig {
    const { app, bundlerConfigs, isBuild } = props

    return mergeConfig(
        {
            configFile: false,
            plugins: [
                vuePlugin(bundlerConfigs?.vuePlugin),
                vitePluginTracer({ app, isBuild })
            ]
        },
        bundlerConfigs?.vite
    )
}