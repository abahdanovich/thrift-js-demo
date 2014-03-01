var Thrift = require('thrift');
var TBufferedTransport = require('thrift/lib/thrift/transport').TBufferedTransport;
var TJSONProtocol = require('thrift/lib/thrift/protocol').TJSONProtocol;
var hello_svc = require('./gen-nodejs/hello_svc.js');

var hello_handler = {
  get_message: function(name, result) {
    var msg = "Hello " + name + "!";
    result(null, msg);
  }
}

var hello_svc_opt = {
  transport: TBufferedTransport,
  protocol: TJSONProtocol,
  cls: hello_svc,
  handler: hello_handler
};

var server_opt = {
  staticFilePath: ".",
  services: {
    "/hello": hello_svc_opt
  }
}

var server = Thrift.createStaticHttpThriftServer(server_opt);
var port = 9099;
server.listen(port);
console.log("Http/Thrift Server running on port: " + port);