var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    wrap   = require('./index');

gulp.task('test', function() {
    gulp.src('./test/src.js')
        .pipe(wrap({
            safeUndef: true,
            closer: '})({args});',
            globals: {
                'window': 'root',
                'Math': 'Math'
            }
        }))
        .pipe(concat('result.js'))
        .pipe(gulp.dest('./test'));

    gulp.src('./test/src.js')
        .pipe(wrap({
            safeUndef: true,
            globals: {
                'window': 'root',
                'Math': 'Math'
            }
        }))
        .pipe(uglify())
        .pipe(concat('min.js'))
        .pipe(gulp.dest('./test'));
});