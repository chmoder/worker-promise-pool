var workerPool = new WorkerPool('https://rawgit.com/chmoder/worker-promise-pool/master/example_worker.js');

var callback = function(data) {
  var timeout = data[0];
  console.log('timeout: ' + timeout);
};

for(var i = 0; i < workerPool.numberOfWorkers; ++i) {
  var workerPromise = new WorkerPromise();
  workerPromise.workload = [hexColor, x, y];
  workerPromise.onmessage = onmessage;
  workerPool.addWorkerPromise(workerPromise);
}
