import Process from '../../src/process.js';

const process = new Process;

process
  .setSource(
    num => num ** 2
  )
  .postMessage(12)
  .then(
    result => console.log('Log ::: Result ::: ', result)
  );
