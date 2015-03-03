var gulp = require('gulp');
var install = require("gulp-install");
var nodemon = require("gulp-nodemon");
var util = require("gulp-util");
var shell = require("gulp-shell");
var _ = require("lodash-node");
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
var src = __dirname + "/src";

gulp.task('install', shell.task([
  'npm install'
], {
  cwd: src
}));

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

gulp.task('test', function () {
  return gulp.src(__dirname + "/test/specs/**.spec.js")
    .pipe(jasmine({
      reporter: new reporters.TerminalReporter()
    }));
});