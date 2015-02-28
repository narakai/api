var fs = require("fs");
var _ = require("lodash-node");

module.exports = {
  getRoutes: function () {
    return _.map(_.remove(fs.readdirSync(__dirname + "/controllers"), function (filename) {
      return /^\w*\.js$/.test(filename);
    }), function (filename) {
      return __dirname + "/controllers/" + filename;
    });
  }
};