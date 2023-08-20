import { test } from "vitest";
import { setupBuild } from "../../src/settings/build";
import { Command as CommandType } from 'commander';
import { createRequire } from "module";

test("setupBuild", () => {
    const require = createRequire(import.meta.url);
    const { program }: { program: CommandType } = require("commander")
    const ctx: CliContext = {
        program,
        require,
        dirname: __dirname
    }
    setupBuild(ctx)
})