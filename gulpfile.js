var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var svgSprite = require('gulp-svg-sprite');
var concat = require('gulp-concat');
var sync = require('gulp-npm-script-sync');

var config = {
    mode: {
        symbol: {
            dest: 'public/styles/images/svg/',
            sprite: 'sprite.svg',
            example: true
        },
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false
        }
    }
};

gulp.task('sprites', function() {
    return gulp.src('public/styles/images/svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('.'));
});

gulp.task('sync', function () {
  sync(gulp, {
  path: 'package.json',
  excluded: ['build-babel']
});
});


gulp.task('concat', function() {
    del.sync('public/js/app.js');

    return gulp.src([
            'app/build/app/components/*.js',
            'public/js/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js/build'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js/build'));
});

gulp.task('images', () => gulp.src('public/styles/images/*')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 7
    }))
    .pipe(gulp.dest('public/styles/images'))
);

gulp.task('sass', function() {
    return gulp.src('app/styles/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/styles/css/'));
});

gulp.task('watch', function() {
    gulp.watch('app/styles/scss/app/*.scss', ['sass']);
    gulp.watch('app/build/app/components/*.js', ['concat']);
    gulp.watch('public/js/*.js', ['concat']);
    gulp.watch('public/styles/images/*', ['images']);
    gulp.watch('app/components/*.js', ['sync']);
    gulp.watch('app/components/*.js', ['concat']);
});

gulp.task('default', ['sass', 'images','concat', 'sprites' , 'sync', 'watch']);