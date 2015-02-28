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

var Sequelize = require('sequelize');
var sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, '', {
  host: databaseConfig.host,
  dialect: databaseConfig.dialect,
  pool: databaseConfig.pool,
  logging: Logger.info
});

//try to connect mysql
sequelize.authenticate().then(function () {
  Logger.info("database connection success");
}).catch(function (err) {
  Logger.error("database connection failed");
  Logger.error(err);
  process.exit(1);
});

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
// load models
var models = {};

var ModelLoader = require("./modelLoader");
var modelArray = _.forEach(_.map(ModelLoader.getModels(), function (modelFile) {
  var name = /^.*\/(\w*)\.js$/.exec(modelFile)[1];
  return {name: name, schema: sequelize.import(modelFile)}
}), function (model) {
  models[model.name] = model.schema
});

var book = models.Book.create({
  name: "测试书籍",
  sn: "ISBN-321312-3213-123",
  summary: ""
});

var routes = require("./routes");
var Router = require('express').Router();

// reg routes
_.forEach(routes.getRoutes(), function (routeFile) {
  require(routeFile)(Router);
});
app.use(Router);


server.listen(9527, function () {
  Logger.info("boom on " + 9527);
});