// initial service
var Logger = require("winston");
Logger.info("Nuclear launcher detected");
var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var validator = require("express-validator");
app.use(validator());

var http = require("http");
var server = http.createServer(app);

server.listen(9527, function () {
  Logger.info("boom on " + 9527);
});