import { loadConfigObject } from "@tracer/node"

export function setupBuild(ctx: CliContext) {
    const { program, dirname } = ctx

    program
        .command("build")
        .description("Build to static site")
        .action(async () => {
            const config = await loadConfigObject(dirname)
            console.log(config);
        })
}