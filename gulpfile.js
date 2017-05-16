"use strict";

var gulp = require("gulp");
var del = require("del");
var ghPages = require('gulp-gh-pages');

gulp.task("clean", function() {
 return del("build");
});

gulp.task("copy", function() {
 return gulp.src([
 "index.html",
 "img/**",
 "css/style.css"
 ], {
 base: "."
 })
 .pipe(gulp.dest("build"));
});

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});
