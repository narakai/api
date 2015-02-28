var gulp = require('gulp');
var install = require("gulp-install");
var nodemon = require("gulp-nodemon");
var util = require("gulp-util");
var shell = require("gulp-shell");
var args = require("yargs").argv;
var _ = require("lodash-node");

var sequelizeBin = 'node_modules/.bin/sequelize';
var databaseConfig = 'config/database.json';
var src = __dirname + "/src";

var cloneArgs = function () {
  var x = _.clone(args);
  delete x["_"];
  delete x["$0"];
  return _.map(x, function (v, k) {
    return " --" + k + " " + v;
  }).join(" ");
};

gulp.task('install', function () {
  return gulp.src(__dirname + '/src/package.json')
    .pipe(install());
});

gulp.task('dev', ['install'], function () {
  var config = {
    script: __dirname + "/src/server.js",
    ext: 'js json',
    env: {'NODE_ENV': 'development'}
  };

  return nodemon(config)
    .on('change', ['install'], function () {
      util.log(util.colors.blue("detect js file changed, restart"))
    })
    .on('restart', ['install'], function () {
      util.log(util.colors.magenta('Restart Service'));
    });
});

gulp.task('db:migrate', shell.task([
  sequelizeBin + " db:migrate --config " + databaseConfig + " " + cloneArgs()
], {
  cwd: src
}));

gulp.task('db:create', shell.task([
  sequelizeBin + " migration:create --config " + databaseConfig + " " + cloneArgs()
], {
  cwd: src
}));

gulp.task('db:undo', shell.task([
  sequelizeBin + " db:migrate:undo --config " + databaseConfig + " " + cloneArgs()
], {
  cwd: src
}));

