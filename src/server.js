// initial service
var Logger = require("winston");
Logger.info("Nuclear launcher detected");
var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var validator = require("express-validator");
var _ = require("lodash-node");
app.use(validator());

var http = require("http");
var server = http.createServer(app);

// environment def
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var databaseConfig = require("./config/database")[env];
var serverConfig = require("./config/server")[env];

var MongoOSE = require("mongoose");
MongoOSE.connect(databaseConfig.uri, databaseConfig.options || {});


// write headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Cache-Control", "no-cache");
  res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Accept, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With,cheatCode, token");
  res.header("X-Powered-By", "Asp.net");
  Logger.info(Date.now() + " [" + req.ip + "] plugged in:" + req.originalUrl + ' by [' + req.method + ']');
  next();
});

var routes = require("./routes");
var Router = require('express').Router();

// reg routes
_.forEach(routes.getRoutes(), function (routeFile) {
  require(routeFile)(Router);
});
app.use(Router);


server.listen(serverConfig.port, function () {
  Logger.info("boom on " + 9527);
});


