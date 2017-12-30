/**
 * Thread.
 * This module represents Thread for processes. Thread is promisified dedicated web worker.
 * @module thread.js
 * @author @SurenAt93
 */

/**
 * The Thread class
 */

export default class Thread {
    
    /**
     * Create a worker
     * @param {Object} worker - The worker for current thread
     * @returns {undefined}
     */

    constructor(worker) {
        this.__worker = worker;
    }

    /**
     * Public method for postMessage
     * @param {any} data - The data for sending to web worker
     * @returns {Promise} - The Promisified worker
     */

    postMessage(data) {
        this.__worker.postMessage(data);

        return new Promise((resolve, reject) => {
            this.__worker.onmessage = msg => resolve(msg.data);
            this.__worker.onerror = err => reject(err);
        });
    }

    /**
     * Public method for terminate web worker
     * @returns {undefined}
     */

    kill() {
        this.__worker.terminate();
    }
}
