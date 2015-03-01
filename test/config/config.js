'use strict';

var endpoints = require("./endpoints.json");
module.exports = {
  "api" : endpoints[process.env.NODE_ENV]? endpoints[process.env.NODE_ENV]['api'] : endpoints['development']['api']
};