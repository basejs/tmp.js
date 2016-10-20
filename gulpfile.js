var gulp = require('gulp'),
	uglify = require('gulp-uglify');

gulp.task('default', function() {
	gulp.src('./tmp.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});