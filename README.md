# worker-promise-pool
Pool of Web Workers that return promises on worker message events.

Create your pool by passing the number of workers you wouild like and the path to the worker script your workers will execute.

Then create a WorkerPromise, workload is the data the worker needs during execution.
Set onmessage to a callback you would like executed after your worker completes.  Callback will have the data from the worker script if you put include it in the "postMessage" of your worker script.

[Try the example!](https://chmoder.github.io/worker-promise-pool/)


```javascript
// create a pool for working on WorkerPromise's with a given number of workers
var numberOfWorkers = 8;
var workerPool = new WorkerPool(numberOfWorkers, 'js/example_worker.js');

var callback = function(data) {
  // do something with data from worker
}

var workerPromise = new WorkerPromise();
// args to pass to worker
workerPromise.workload = [];
// callback for when the worker completes its task
workerPromise.onmessage = callback;
// add WorkerPromise to the pool and queue it up for execution
workerPool.addWorkerPromise(workerPromise);
```
