export function setupVersion({ program, require }: CliContext) {
    const version = require("@tracer/node/package.json").version;
    const cliVersion = require("@tracer/cli/package.json").version;
    program
        .name("tracer")
        .description('analyzing the dependence of your project')
        .version(`@tracer/node: ${version} 
@tracer/cli: ${cliVersion}`,
            "-v, --version", "output the current version");
}