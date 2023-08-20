declare interface CliContext {
    program: import("commander").Command
    require: NodeRequire
    dirname: string
}