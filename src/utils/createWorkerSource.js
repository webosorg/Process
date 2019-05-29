/**
 * createWorkerSource
 * For creating dedicated web worker source dynamically.
 * @module utils/createWorkerSource.js
 * @author @SurenAt93
 */

const createWorkerSource = (isFunction, source, deps = [], fnName) => {
  const transformedDeps = deps.map(item => `\'${item}\'`).join(',');
  const transformedSource = `
    importScripts(${transformedDeps});
    ${
      isFunction
        ? `const fn = ${source};`
        : `;${source}; const fn = ${fnName}`
    }

    self.onmessage = msg => {
      const result = fn(msg.data);
      self.postMessage(result);
    }
  `;

  return transformedSource;
}

export default createWorkerSource;
