var gulp = require('gulp');
var install = require("gulp-install");
var nodemon = require("gulp-nodemon");
var util = require("gulp-util");

gulp.task('install', function () {
  return gulp.src(__dirname + '/src/package.json')
    .pipe(install());
});

gulp.task('dev', ['install'] ,function () {
  var config = {
    script: __dirname + "/src/server.js",
    ext: 'js json',
    env: {'NODE_ENV': 'local'}
  };

  return nodemon(config)
    .on('change', ['install'], function () {
      util.log(util.colors.blue("detect js file changed, restart"))
    })
    .on('restart', function () {
      util.log(util.colors.magenta('Restart Service'));
    });
});