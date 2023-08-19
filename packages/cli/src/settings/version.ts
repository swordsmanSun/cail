export function setupVersion({ program, require }: CliContext) {
    const version = require("@cail/node/package.json").version;
    const cliVersion = require("../../package.json").version;
    program.version(`cail version ${version} @cail/cli version ${cliVersion}`);
}