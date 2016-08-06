function WorkerPool(url) {
  this.numberOfWorkers = 16;
  this.workerPromises = [];
  this.pool = [];
  this.promises = [];
  this.url = url;

  this.startWorkers();
}

this.WorkerPool.prototype.startWorkers = function() {
  for(var i = 0; i < this.numberOfWorkers; ++i) {
    var worker = new Worker(this.url);
    this.pool.push(worker);
  }
};

this.WorkerPool.prototype.addWorkerPromise = function(workerPromise) {
  this.workerPromises.push(workerPromise);
  this.releaseWorkerPromise();
}

this.WorkerPool.prototype.releaseWorkerPromise = function() {
  if(this.workerPromises.length > 0) {
    if(this.pool.length > 0) {
      var workerPromise = this.workerPromises.shift();
      var worker = this.pool.shift();     
      var runPromise = workerPromise.run(worker);
      runPromise.then(function success(worker) {
        this.pool.push(worker);
        this.releaseWorkerPromise();
      }.bind(this));
    }
  }
}

function WorkerPromise() {
  this.worker = null;
  this.promise = null;
  this.workload = null;
  this.onmessage = null;
  this.onerror = null;
}

this.WorkerPromise.prototype.run = function(worker) {
  this.worker = worker;

  this.promise = new Promise(function(resolve, reject) {   
      this.worker.onmessage = function(e) {
        this.onmessage(e.data);
        resolve(this.worker);
      }.bind(this);
  }.bind(this));

  this.worker.onerror = this.onerror;
  this.worker.postMessage(this.workload);

  return this.promise;
}
