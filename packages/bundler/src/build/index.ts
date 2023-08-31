import { App } from "@tracer/node";
import { Bundler } from "../../types/bundler";
import { BundlerConfigs } from "../../types/options";
import { resolveViteOptions } from "../utils/resolveOptions";
import debug from "debug";

const log = debug("@tracer/bundler:build")

export async function build(bundlerConfigs: BundlerConfigs | undefined, app: App): ReturnType<Bundler["build"]> {
    log("compiling app...")

    const viteOptions = resolveViteOptions({ app, bundlerConfigs, isBuild: true })

    // const viteOutput = await viteBuild(viteOptions)

    log("compile app done")
}

