onmessage = function(e) {
  for(var i = 0; i <= 777; ++i) {
    if(i == 777) {
      postMessage(['It Worked!']);
    }
  }
};
