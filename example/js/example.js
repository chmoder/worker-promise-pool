var workerPool = new WorkerPool(8, 'js/example_worker.js');

var callback = function(data) {
  var timeout = data[0];
  console.log('timeout: ' + timeout);

document.body.innerHTML += '<h3>Timeout: '+timeout+'</h3>';
};

for(var i = 0; i < workerPool.numberOfWorkers; ++i) {
  var workerPromise = new WorkerPromise();
  workerPromise.workload = [];
  workerPromise.onmessage = callback;
  workerPool.addWorkerPromise(workerPromise);
}
