import { Command } from 'commander';
import { createRequire } from 'module';
import { setupVersion } from './settings/version';

const require = createRequire(import.meta.url);

export function cli(appConfig: AppConfig) {
    const program = new Command("cail");

    const ctx: CliContext = {
        program,
        require
    }

    setupVersion(ctx)
}

