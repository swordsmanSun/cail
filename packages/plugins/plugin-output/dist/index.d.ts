import { App } from '@tracer/node';

declare function tracerPluginOutput(): (app: App) => void;

export { tracerPluginOutput };
