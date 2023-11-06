let cbs = [];
let params = [];

function flushCallbacks() {
  cbs.forEach((cb, i) => cb(...params[i]));
  cbs = [];
  params = [];
}

function beforeNextFrame(cb, ...args) {
  // eslint-disable-next-line no-unused-expressions
  cbs.push(cb) === 1 && requestAnimationFrame(flushCallbacks);
  params.push(args);
}
export { beforeNextFrame };
