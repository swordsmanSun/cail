// src/index.ts
import { default as default2 } from "debug";
import { default as default3 } from "chalk";

// src/functional/index.ts
function Pipe(...fns) {
  return (...args) => fns.reduce((arg, fn) => arg.length ? fn(...arg) : fn(arg), args);
}

// src/module/importModule.ts
import { pathToFileURL } from "url";
async function importModule(fileAbsPath) {
  let module;
  try {
    module = await import(fileAbsPath);
  } catch (error) {
    module = await import(pathToFileURL(fileAbsPath).href);
  }
  return module;
}
var packageJsonDefault = () => ({
  name: "",
  version: "",
  description: "",
  main: "",
  module: "",
  types: "",
  files: [],
  scripts: {},
  dependencies: {},
  devDependencies: {},
  peerDependencies: {},
  optionalDependencies: {},
  bundledDependencies: [],
  keywords: []
});
async function importPackageJson(fileAbsPath) {
  const module = (await importModule(fileAbsPath)).default;
  const pkg = {
    ...packageJsonDefault(),
    ...module
  };
  return pkg;
}

// src/common/withDefault.ts
function withDefault(value, defaultValue) {
  if (defaultValue !== null && !(defaultValue instanceof Array) && typeof defaultValue === "object") {
    let obj = {};
    Object.keys(defaultValue).forEach((key) => {
      obj[key] = withDefault(value?.[key], defaultValue[key]);
    });
    return obj;
  } else {
    return value ?? defaultValue;
  }
}

// src/common/tree.ts
function DFS(tree, callbackFn, props = { children: "children" }) {
  if (Array.isArray(tree)) {
    for (const node of tree) {
      if (callbackFn(node) === false)
        return;
      const subTree = node[props.children];
      if (subTree && Array.isArray(subTree)) {
        DFS(subTree, callbackFn);
      }
    }
  } else {
    DFS([tree], callbackFn);
  }
}
function BFS(tree, callbackFn, props = { children: "children" }) {
  if (Array.isArray(tree)) {
    const queue = tree;
    while (queue.length) {
      const node = queue.shift();
      if (callbackFn(node) === false)
        return;
      const subTree = node[props.children];
      if (subTree && Array.isArray(subTree)) {
        queue.push(...subTree);
      }
    }
  } else {
    DFS([tree], callbackFn);
  }
}
function DFSReduce(tree, callbackFn, initialValue, props = { children: "children" }) {
  if (Array.isArray(tree)) {
    if (initialValue !== void 0) {
      let result = initialValue;
      DFS(tree, (node) => {
        result = callbackFn(result, node);
      }, props);
      return result;
    } else {
      let result = tree[0];
      if (result[props.children]) {
        DFS(result[props.children], (node) => {
          result = callbackFn(result, node);
        });
      }
      DFS(tree.slice(1), (node) => {
        result = callbackFn(result, node);
      }, props);
      return result;
    }
  }
}
export {
  BFS,
  DFS,
  DFSReduce,
  Pipe,
  default3 as chalk,
  default2 as debug,
  importModule,
  importPackageJson,
  packageJsonDefault,
  withDefault
};
