var fs = require("fs");
var _ = require("lodash-node");

module.exports = {
  load: function (sequelize) {
    _.forEach(_.remove(fs.readdirSync(__dirname + "/models"), function (filename) {
      return /^\w*\.js$/.test(filename);
    }), function (filename) {
      sequelize.import(__dirname + "/models/" + filename);
    });
  }
};