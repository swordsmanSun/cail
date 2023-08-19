export function setupBuild(ctx: CliContext) {
    const { program } = ctx

    program
        .command("build")
        .description("Build to static site")
        .action(() => {
            console.log("build success");
        })
}