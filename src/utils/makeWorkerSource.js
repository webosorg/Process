export default class MakeWorkerSource {
  /**
   * Check options and call 'workerSource' method.
   * @param { object } options - Options for worker body. Can contain worker dependency and fn.
   */

  constructor(fn, deps = []) {

    this.fn = fn;

    this.deps = deps.map(item => `\'${item}\'`).join(',');

    this.workerSource();
  }

  /**
   * Make worker source.
   * @return { Function }
   */

  workerSource() {
    // TODO ::: Optimize this case
    return Function(
      `
        importScripts(${this.deps});
        const fn = ${this.fn};
        self.onmessage = msg => {
          const result = fn(msg.data);
          self.postMessage(result);
        }
      `
    );
  }
}
