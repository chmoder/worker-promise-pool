var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var util = require('util');

var dir = path.dirname(fs.realpathSync(__filename));

http.createServer(function (req, res) { 
  var pathname = url.parse(req.url).pathname;
  var m;
  if (pathname == '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(dir + '/example.html').pipe(res);
    return;
  } else if (m = pathname.match(/^\/js\//)) {
    var filename = dir + pathname;
    var stats = fs.existsSync(filename) && fs.statSync(filename);
    if (stats && stats.isFile()) {
      res.writeHead(200, {'Content-Type' : 'application/javascript'});
      fs.createReadStream(filename).pipe(res);
      return;
    }
  } 
    res.end();
    return;
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('404 Not Found\n');
  res.end();
}).listen(8765, 'localhost');

console.log('mosaic server running on port 8765');
