let onceCbs = [];
const paramsMap = new WeakMap();

function flushOnceCallbacks() {
  onceCbs.forEach((cb) => cb(...paramsMap.get(cb)));
  onceCbs = [];
}
function beforeNextFrameOnce(cb, ...params) {
  paramsMap.set(cb, params);
  if (onceCbs.includes(cb)) return;
  // eslint-disable-next-line no-unused-expressions
  onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks);
}
export { beforeNextFrameOnce };
