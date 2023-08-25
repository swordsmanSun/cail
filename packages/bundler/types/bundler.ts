
import { App } from "@tracer/node"

export type Bundler = {
    build: (app: App) => Promise<void>;
    dev: (app: App) => Promise<() => Promise<void>>;
}