class Thread {
    
    constructor(worker) {
        this.__worker = worker;
    }

    postMessage(data) {
        this.__worker.postMessage(data);

        return new Promise((resolve, reject) => {
            this.__worker.onmessage = msg => resolve(msg.data);
            this.__worker.onerror = err => reject(err);
        });
    }

    kill() {
        this.__worker.terminate();
    }
}

export default Thread;
