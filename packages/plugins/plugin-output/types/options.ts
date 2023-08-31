type OutPutOptions = {
    type: "json" | "js" | "ts",
    dir: string,
    filename: string,
}[]

export type TracerPluginOutputOptions<OutPutOptions> = {
    outputs: OutPutOptions,
}
export type TracerPluginOutputOptionsPartial = Partial<TracerPluginOutputOptions<Partial<OutPutOptions>>>;
export type TracerPluginOutputOptionsRequire = TracerPluginOutputOptions<Required<OutPutOptions>>