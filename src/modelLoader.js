var fs = require("fs");
var _ = require("lodash-node");

module.exports = {
  getModels: function () {
    return _.map(_.remove(fs.readdirSync(__dirname + "/models"), function (filename) {
      return /^\w*\.js$/.test(filename);
    }), function (filename) {
      return __dirname + "/models/" + filename;
    });

  }
};