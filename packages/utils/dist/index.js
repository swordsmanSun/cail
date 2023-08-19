// src/functional/index.ts
function Pipe(...fns) {
  return (...args) => fns.reduce((arg, fn) => arg.length ? fn(...arg) : fn(arg), args);
}
export {
  Pipe
};
