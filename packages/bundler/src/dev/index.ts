import { App } from "@tracer/node";
import { Bundler } from "../../types/bundler";
import { BundlerConfigs } from "../../types/options";
import { resolveViteOptions } from "../utils/resolveOptions";
import { createServer } from "vite";
import { chalk, importPackageJson } from "@tracer/utils";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export async function dev(bundlerConfigs: BundlerConfigs | undefined, app: App): ReturnType<Bundler["dev"]> {
    const { server: { host, port } } = app

    const viteOptions = resolveViteOptions({ app, bundlerConfigs, isBuild: false })

    const server = await createServer(viteOptions)

    await server.listen()

    const viteVersion = importPackageJson(join(dirname(fileURLToPath(import.meta.url)), "../node_modules/vite/package.json")).version

    server.config.logger.info(
        chalk.cyan(`\nvite v${viteVersion}\n`) +
        chalk.green(`dev server running at:\thttp://${host}:${port}`),
        {
            clear: !server.config.logger.hasWarned,
        },
    )

    return server.close.bind(server)
}