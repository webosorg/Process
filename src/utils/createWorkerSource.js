/**
 * CreateWorkerSource
 * For creating dedicated web worker source dynamically.
 * @module utils/createWorkerSource.js
 * @author @SurenAt93
 */

/**
 * The CreateWorkerSource class
 */

export default class CreateWorkerSource {

  /**
   * Set options.
   * @params {Function} fn - Function, which should run in web worker.
   * @params {Array} deps - Array of Dependencies for worker env.
   */

  constructor(fn, deps = []) {

    this.fn = fn;

    this.deps = deps.map(item => `\'${item}\'`).join(',');

  }

  /**
   * Public method for creating source for worker
   * @returns {string}
   */

  workerSource() {
    return `
      importScripts(${this.deps});
      const fn = ${this.fn};
      self.onmessage = msg => {
        const result = fn(msg.data);
        self.postMessage(result);
      }
    `;
  }
}
