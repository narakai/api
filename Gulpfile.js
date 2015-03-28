var gulp = require('gulp');
var jshint = require('gulp-jshint');
var install = require("gulp-install");
var nodemon = require("gulp-nodemon");
var util = require("gulp-util");
var shell = require("gulp-shell");
var _ = require("lodash-node");
var jasmine = require('gulp-jasmine');
var reporters = require('jasmine-reporters');
var src = __dirname + "/src";
var migrator = require('./migrator');
var yaml = require('gulp-yaml');

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

gulp.task('lint', function () {
    return gulp.src(['src/*.js', 'src/controllers/*.js', 'src/models/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
});

gulp.task('test:run',['lint', 'migrate:up'], function () {
  return gulp.src(__dirname + "/test/specs/**.spec.js")
    .pipe(jasmine({
      reporter: new reporters.TapReporter()
    }));
});

gulp.task('migrate:up', function () {
  return migrator.up();
});

gulp.task('migrate:down', function () {
  return migrator.down();
});

gulp.task('test',['test:run'], function () {
  return migrator.down();
});

gulp.task('api:publish', function () {
  return gulp.src("./swagger.yaml")
    .pipe(yaml({safe: true}))
    .pipe(gulp.dest('./'));
});