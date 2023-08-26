import { Bundler } from "../types/bundler";
import { BundlerConfigs } from "../types/options";
import { build } from "./build";
import { dev } from "./dev";

export function bundler(options?: BundlerConfigs): Bundler {
    return {
        dev: (app) => dev(options, app),
        build: (app) => build(options, app)
    }
}

export * from "../types"