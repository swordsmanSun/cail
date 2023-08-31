// src/index.ts
import { defineOptions, onAnalyzed } from "@tracer/node";

// src/resolveOptions.ts
import { join } from "path";
function resolveOptions(app, options = {}) {
  options.outputs = options.outputs ?? [
    { type: "json", dir: join(app.path.root(), "tracer-output"), filename: "tracer-output" }
  ];
  return options;
}

// src/index.ts
import { join as join2 } from "path";
import { outputFileSync } from "fs-extra";
function tracerPluginOutput(options) {
  return (app) => {
    defineOptions({
      name: "tracer-plugin-output"
    });
    const optionsRequire = resolveOptions(app, options);
    onAnalyzed((project) => {
      optionsRequire.outputs.forEach((output) => {
        const outputFile = (content) => {
          outputFileSync(join2(output.dir, output.filename + "." + output.type), content);
        };
        if (output.type === "json") {
          outputFile(`${JSON.stringify(project.dependencyTree, null, 4)}`);
        } else if (output.type === "js") {
          outputFile(`export default JSON.parse(${JSON.stringify(project.dependencyTree, null, 4)})`);
        } else if (output.type === "ts") {
          outputFile(`export default JSON.parse(${JSON.stringify(project.dependencyTree, null, 4)})`);
        }
      });
    });
  };
}
export {
  tracerPluginOutput
};
