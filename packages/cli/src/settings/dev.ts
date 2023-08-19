export function setupDev(ctx: CliContext) {
    const { program } = ctx

    program
        .command("dev")
        .description("dev to static site")
        .action(() => {
            console.log("dev success");
        })
}