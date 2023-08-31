import { App } from '@tracer/node';

type OutPutOptions = {
    type: "json" | "js" | "ts";
    dir: string;
    filename: string;
}[];
type TracerPluginOutputOptions<OutPutOptions> = {
    outputs: OutPutOptions;
};
type TracerPluginOutputOptionsPartial = Partial<TracerPluginOutputOptions<Partial<OutPutOptions>>>;
type TracerPluginOutputOptionsRequire = TracerPluginOutputOptions<Required<OutPutOptions>>;

declare function tracerPluginOutput(options?: Partial<TracerPluginOutputOptionsPartial>): (app: App) => void;

export { TracerPluginOutputOptions, TracerPluginOutputOptionsPartial, TracerPluginOutputOptionsRequire, tracerPluginOutput };
