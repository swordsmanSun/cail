export function setupVersion({ program, require }: CliContext) {
    const version = require("@tracer/node/package.json").version;
    const cliVersion = require("../../package.json").version;
    program.version(`tracer version ${version} @tracer/cli version ${cliVersion}`);
}