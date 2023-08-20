#!/usr/bin/env node

// src/main.ts
import { createRequire } from "module"
import { cwd } from "process"

// src/settings/build.ts
import { loadConfigModule } from "@tracer/node"
function setupBuild(ctx) {
    const { program, dirname } = ctx
    program
        .command("build")
        .description("Build to static site")
        .action(async () => {
            const config = (await loadConfigModule(dirname)).default
        })
}

// src/settings/dev.ts
function setupDev(ctx) {
    const { program } = ctx
    program
        .command("dev")
        .description("dev to static site")
        .action(() => {
            console.log("dev success")
        })
}

// src/settings/version.ts
function setupVersion({ program, require: require2 }) {
    const version = require2("@tracer/node/package.json").version
    const cliVersion = require2("@tracer/cli/package.json").version
    program
        .name("tracer")
        .description("analyzing the dependence of your project")
        .version(
            `@tracer/node: ${version} 
@tracer/cli: ${cliVersion}`,
            "-v, --version",
            "output the current version"
        )
}

// src/main.ts
function cli(dirname) {
    const require2 = createRequire(import.meta.url)
    const { program } = require2("commander")
    const ctx = {
        program,
        require: require2,
        dirname,
    }
    setupVersion(ctx)
    setupBuild(ctx)
    setupDev(ctx)
    program.parse()
}
cli(cwd())
export { cli }
