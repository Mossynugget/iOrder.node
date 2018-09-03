var index = require("./routes/index");
var express = require('express');
var app = express();

app.use('/', index);

var server = app.listen(8087, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("iOrder listening at http://%s:%s", host, port)

})
