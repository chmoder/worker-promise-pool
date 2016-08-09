# worker-promise-pool
Pool of Web Workers that return promises on worker message events.

Create your pool by passing the number of workers you wouild like and the path to the worker script your workers will execute.

Then create a WorkerPromise, workload is the data the worker needs during execution.
Set onmessage to a callback you would like executed after your worker completes.  Callback will have the data from the worker script if you put include it in the "postMessage" of your worker script.

```javascript
var numberOfWorkers = 8;
var workerPool = new WorkerPool(numberOfWorkers, 'js/example_worker.js');

var callback = function(data) {
  // do something with data from worker
}

var workerPromise = new WorkerPromise();
workerPromise.workload = [];
workerPromise.onmessage = callback;
workerPool.addWorkerPromise(workerPromise);
```
