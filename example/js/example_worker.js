onmessage = function(e) {
  // create timeout for message callback work simulation
  var timeout = Math.floor(Math.random() * 15000);
  setTimeout(function(){
    postMessage([timeout]);
  },
    timeout
  );
};
