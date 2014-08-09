var gulp = require('gulp')
var webpack = require('gulp-webpack')
var gutil = require("gulp-util")
var webpack = require("webpack")

gulp.task('html', function() {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('build'))
})

gulp.task('watch', function() {
    gulp.watch('src/**/*.html', ['html'])
    gulp.watch(['src/**/*'], ['webpack'])
})

gulp.task("webpack", function(callback) {
    webpack(require('./webpack.config.js'), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err)
        gutil.log("[webpack]", stats.toString({
        }))
        callback()
    })
})

gulp.task('default', ['html', 'webpack'])

gulp.task('serve', ['default', 'watch'], function() {
    var express = require('express')
    var path = require('path')

    var server = express()
    server.use(express.static(path.resolve('build')))
    server.listen(process.env.PORT || 8080)
})
