'use strict';

var endpoints = require("./endpoints.json");
var api = endpoints[process.env.NODE_ENV] ? endpoints[process.env.NODE_ENV]['api'] : endpoints['development']['api'];
module.exports = {
  book: api + "/books",
  user: api + "/users",
  searchUserByGeo: api + "/users/geosearch",
  healthCheck: api + "/healthcheck",
  existingOAuthObject: {
    from: "qq",
    open_id: "F060E94D032970382DA473C167BBD93F",
    access_token: "3AD8ACC291B3ED7D4669481BD6C6FCA8"
  },
  notExistingOAuthObject: {
    from: "qq",
    open_id: "A664119462342DAF29F7062998056620",
    access_token: "D786CBC2A6C89244044F1ED03E89FB79"
  }
};