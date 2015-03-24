'use strict';

var endpoints = require("./endpoints.json");
var api = endpoints[process.env.NODE_ENV] ? endpoints[process.env.NODE_ENV]['api'] : endpoints['development']['api'];
module.exports = {
  book: api + "/books",
  user: api + "/users",
  searchUserByGeo: api + "/users/geosearch",
  healthCheck: api + "/healthcheck"
};