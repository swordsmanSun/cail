import { Command as CommandType } from 'commander';
import { createRequire } from 'module';
import { setupBuild } from './settings/build';
import { setupDev } from './settings/dev';
import { setupVersion as setupInfo } from './settings/version';

export function cli() {
    const require = createRequire(import.meta.url);
    // const program = new Command();
    const { program }: { program: CommandType } = require("commander")
    const ctx: CliContext = {
        program,
        require
    }
    // display version
    setupInfo(ctx)
    // register build command
    setupBuild(ctx)
    // register dev command
    setupDev(ctx)
    // parse the command line args
    program.parse()
}

cli()