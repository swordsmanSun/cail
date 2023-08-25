import type { Options as VuePluginOptions } from '@vitejs/plugin-vue'
import { InlineConfig } from "vitest"

export type BundlerOptions = Required<BundlerConfigs>
export type BundlerConfigs = {
    vite?: InlineConfig
    vuePlugin?: VuePluginOptions
}