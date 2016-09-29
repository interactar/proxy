
var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//

proxy.on('proxyRes', function(proxyRes, req, res, options) {
  proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  res.setHeader('Access-Control-Allow-Origin', '*');
});

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, {
    target: process.env.TARGET
  });
});

var port = process.env.PORT || 5050;
console.log("listening on port " + port)
server.listen(port);
