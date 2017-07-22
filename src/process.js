/**
 * ProcessJs.
 * Creator of processes, which can run on another thread using web workers and promises.
 * @module process.js
 * @author @SurenAt93
 */

import { getDefaultOptions } from './defaultOptions.js';

import MakeWorkerSource from './utils/MakeWorkerSource.js';

import { generateRandomId } from './utils/generators.js';

import Thread from './thread.js';

/**
 * The Process class
 */

export default class Process {

    /**
     * Create a default options.
     */

    constructor(options) {

      const defaultOptions = getDefaultOptions();

      const currentOptions = options ? { ...options, ...defaultOptions } : defaultOptions;

      const { id, name } = currentOptions;

      this.id = id;
      this.name = name;

      this.__threads = {};
    }

    /**
     * Static method for getting hardware concurrency
     * @returns {number} - The hardware concurrency
     */
    static getHardwareConcurrency() {
      return navigator.hardwareConcurrency;
    }

    /**
     * Public method for setting source for process
     * @param {Function} fn - The function, which should run in new process
     * @param {Array} deps - Optionsl ::: Dependencies for new env
     * @returns {Promise} - The Promisified worker
     */

    setSource(fn, deps = []) {
        if (!fn) {

            throw new Error('Failed to construct ::: First argument required');

        } else if (typeof fn !== 'function') {

            throw new Error(`'fn' in new process should be Function`);

        } else {

            let workerSource = new MakeWorkerSource(fn, deps).workerSource();

            const source = workerSource.toString();

            const code = source.substring(source.indexOf('{') + 1, source.lastIndexOf('}'));

            let blob = new Blob([ code ], {type: 'application/javascript'});

            const worker = new Worker(URL.createObjectURL(blob));

            const currentThreadId = generateRandomId();

            this.__threads[currentThreadId] = new Thread(worker);

            return this.__threads[currentThreadId];
        }
    }

    /**
     * Public method for killing process
     * @returns {undefined}
     */

    kill() {
        Object.keys(this.__threads).forEach(threadId => {
            this.__threads[threadId].kill(); 
        });
        this.__threads = {};
    }
}
