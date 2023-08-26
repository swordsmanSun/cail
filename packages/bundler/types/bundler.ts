
import { App } from "@tracer/node"
import { ViteDevServer } from "vite";

export type Bundler = {
    build: (app: App) => Promise<void>;
    dev: (app: App) => Promise<ViteDevServer["close"]>;
}