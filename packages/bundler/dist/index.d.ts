import { App } from '@tracer/node';
import { ViteDevServer } from 'vite';
import { Options } from '@vitejs/plugin-vue';
import { InlineConfig } from 'vitest';

type Bundler = {
    build: (app: App) => Promise<void>;
    dev: (app: App) => Promise<ViteDevServer["close"]>;
};

type BundlerOptions = Required<BundlerConfigs>;
type BundlerConfigs = {
    vite?: InlineConfig;
    vuePlugin?: Options;
};

declare function bundler(options?: BundlerConfigs): Bundler;

export { Bundler, BundlerConfigs, BundlerOptions, bundler };
