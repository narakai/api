var gulp = require('gulp');
var install = require("gulp-install");
var nodemon = require("gulp-nodemon");
var util = require("gulp-util");
var shell = require("gulp-shell");

var sequelizeBin = 'node_modules/.bin/sequelize';
var src = __dirname + "/src";


gulp.task('install', function () {
  return gulp.src(__dirname + '/src/package.json')
    .pipe(install());
});

gulp.task('dev', ['install'], function () {
  var config = {
    script: __dirname + "/src/server.js",
    ext: 'js json',
    env: {'NODE_ENV': 'local'}
  };

  return nodemon(config)
    .on('change', ['install'], function () {
      util.log(util.colors.blue("detect js file changed, restart"))
    })
    .on('restart', ['install'], function () {
      util.log(util.colors.magenta('Restart Service'));
    });
});

gulp.task('migrate', ['install'], function () {
  var cmd = sequelizeBin + " db:migrate";
  return shell.task([
    cmd
  ], {
    cwd: src
  });
});

gulp.task('create:schema', function () {
  var cmd = sequelizeBin + " migration:create " + gulp.env.name ? gulp.env.name : "bot";
  return shell.task([
    cmd
  ], {
    cwd: src
  });
});