// src/index.ts
import { defineOptions } from "@tracer/node";
function tracerPluginOutput() {
  return (app) => {
    defineOptions({
      name: "tracer-plugin-output"
    });
  };
}
export {
  tracerPluginOutput
};
