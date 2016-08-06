onmessage = function(e) {
  var timeout = Math.floor(Math.random() * 15);
  setTimeout(function(){
    postMessage([timeout]);
  },
    timeout
  );
};
