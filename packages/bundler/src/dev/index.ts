import { App } from "@tracer/node";
import { Bundler } from "../../types/bundler";
import { BundlerConfigs } from "../../types/options";
import { resolveViteOptions } from "../utils/resolveOptions";
import { createServer } from "vite";
import { chalk, importPackageJson } from "@tracer/utils";

export async function dev(bundlerConfigs: BundlerConfigs | undefined, app: App): ReturnType<Bundler["dev"]> {
    const viteOptions = resolveViteOptions({ app, bundlerConfigs, isBuild: false })

    const server = await createServer(viteOptions)

    await server.listen()

    const viteVersion = (await importPackageJson('vite/package.json')).version

    server.config.logger.info(
        chalk.cyan(`\n  vite v${viteVersion}`) +
        chalk.green(` dev server running at:\n`),
        {
            clear: !server.config.logger.hasWarned,
        },
    )
    
    return server.close.bind(server)
}