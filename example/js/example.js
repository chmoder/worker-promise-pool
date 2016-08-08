var numberOfWorkers = 8;
var completedTasks = 0;
var workerPool = new WorkerPool(numberOfWorkers, 'js/example_worker.js');

var callback = function(data) {
  var message = data[0];
  document.body.innerHTML += '<h4>'+message+'</h4>';

  if(++completedTasks == numberOfWorkers) {
    document.body.innerHTML += '<h2>End!</h2>';
    workerPool.endWorkers();
  }
};


var example = function() {
  document.body.innerHTML += '<h2>Start!</h2>';

  for(var i = 0; i < workerPool.numberOfWorkers; ++i) {
    var workerPromise = new WorkerPromise();
    workerPromise.workload = [];
    workerPromise.onmessage = callback;
    workerPool.addWorkerPromise(workerPromise);
  }
}
