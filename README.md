# @webos/process

[![(a histogram of downloads)](https://nodei.co/npm-dl/@webos/process.png)](https://www.npmjs.com/package/@webos/process)

## Synopsys

Creation of Dynamic Dedicated WebWorkers, definition of dependencies, promise support.

## Motivation

Today we have an opportunity to run a js code in other threads in browsers by using web workers. Web workers give us new flexibility and opportunity for creating more complex js applications. But web workers' api may create complications in some cases: for example, when we want to run the following code:

```js
console.log('Hello world');
```

in other thread, we can do this in two ways:

1) Create a new file myWorker.js which will contain the code

```js
console.log('Hello World');
```

and then call it from the main thread by writing

```js
const myWorker = new Worker('./myWorker.js');
```

2) Or if we want to create it in a dynamic way, we can write:

```js
const source = 'console.log("Hello world")';

const blob = new Blob([source], {type: 'application/javascript'});

const myWorker = new Worker(URL.createObjectURL(blob));
```

@webos/process lets us create dynamic workers, use and manage them more comfortably and with promise support.
There is no need to create a new file, also there is no need in onmessage or onerror callbacks, the latest will work with promise support. For example:

```js
import Process from '@webos/process';

const process = new Process();

process
  .setSource(
    num => num ** 2
  )
  .postMessage(12)
  .then(
    result => console.log('Log ::: Result ::: ', result)
  );
```

@webos/process also allows to define dependencies for workers

```js
import Process from '@webos/process';

const process = new Process;

process
  .setSource(
    arr => _.sortBy(arr),
    ['https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js']
  )
  .postMessage([3, 2, 0, 1])
  .then(
    result => console.log('Log ::: Result ::: ', result)
  );
```

Also, you can pass a string to *.setSrouce* method as a source; in that case, you also need to pass the function name (which is going to be executed from source as a final function) as a third parameter. For example:

```js
import Process from '@webos/process';

const process = new Process;

process
  .setSource(
    `
      const fibs = {};

      function fib(n) {
        if (n < 2) {
          return n;
        } else {
          if (!((n - 1) in fibs)) {
            fibs[n - 1] = fib(n - 1);
          }
          if (!((n - 2) in fibs)) {
            fibs[n - 2] = fib(n -2);
          }
          return fibs[n - 1] + fibs[n - 2];
        }
      }

      function anotherFunction(x) { return x + 1 }

      const oneMoreFunction = opt => { //... }
    `,
    [],
    'fib' // we want to "work" exactly with 'fib' function
  )
  .postMessage(14)
  .then(
    result => console.log('Log ::: Result ::: ', result)
  );
```

## Install

[![(npm package version)](https://nodei.co/npm/@webos/process.png?downloads=true&downloadRank=true)](https://npmjs.org/package/@webos/process)

### Install for usage

**Latest packaged version**

```bash
npm i @webos/process
```
 
or
 
```bash
yarn add @webos/process
```

**Latest version available in GitHub**

```bash
npm i https://github.com/webosorg/Process
```
 
or
 
```bash
yarn add https://github.com/webosorg/Process
```

### Install for development

```bash
git clone https://github.com/webosorg/Process.git
```

## Usage

**NOTE :::** In this stage it's only for browsers.

#### Simple usage

```js
// Import @webos/process
import Process from '@webos/process';

// Create a new process

const process = new Process;

process
  // set source (fn and deps)
  .setSource(
    num => num ** 2
  )
  // send data for calculation
  .postMessage(12)
  // get result
  .then(
    result => console.log('Log ::: Result ::: ', result)
  );
```

#### With dependencies

```js
// Import @webos/process
import Process from '@webos/process';

// Create a new process
const process = new Process;

process
  // set source (fn and deps)
  .setSource(
    // fn
    arr => _.sortBy(arr),
    // array of dependencies
    ['https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js']
  )
  // send data for calculation
  .postMessage([3, 2, 0, 1])
  // get result
  .then(
    result => console.log('Log ::: Result ::: ', result)
  );
```

#### Full Promise support

```js
const process_01 = new Process;

const process_02 = new Process;

const calc_01 = process_01.setSource(arr => arr.sort(arr));

const calc_02 = process_01.setSource(num => num ** 2);

const calc_03 = process_02.setSource(
  arr => _.sortBy(arr),
  ['https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js']
);

Promise.all(
  [
    calc_01.postMessage([3, 1, 2]),
    calc_02.postMessage(12),
    calc_03.postMessage(['x', 'y', 'z', 'a', 123])
  ]
)
.then(result => {
  process_01.kill();
  process_02.kill();
  console.log('Log ::: Result ::: ', result);
});
```

## License

[MIT licensed](LICENSE)
