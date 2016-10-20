var gulp = require('gulp')
var del = require('del')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
var rename = require('gulp-rename')
var svgSprite = require('gulp-svg-sprite')
var concat = require('gulp-concat')
var sync = require('gulp-npm-script-sync')
var svg2png = require('gulp-svg2png')

var config = {
    mode: {
        symbol: {
            dest: 'sprite/',
            sprite: 'sprite.svg',
            example: true
        },
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false
        }
    }
}

gulp.task('sprites', function () {
    return gulp.src('./public/styles/images/svg/sprite/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('public/styles/images'))
})

gulp.task('svg2png', function () {
    gulp.src('./public/styles/images/svg/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./public/styles/images/png'))
})

gulp.task('sync', function () {
    sync(gulp, {
        path: 'package.json',
        excluded: ['build-babel']
    })
})

gulp.task('concat', function () {
    del.sync('public/js/app.js')

    return gulp.src([
        'app/components/main.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'))
})

gulp.task('AllScripts', function () {
    return gulp.src([
        './public/js/components/jquery/dist/jquery.min.js',
        './public/js/components/react/react.min.js',
        './public/js/components/react/react-dom.min.js',
        './public/js/components/gsap/src/minified/TweenMax.min.js',
        './public/js/components/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
        './public/js/components/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
        './public/js/components/skrollr/dist/skrollr.min.js',
        './public/js/components/particles.js/particles.min.js'
    ])
     .pipe(sourcemaps.init())
        .pipe(concat('components.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(uglify())
        .pipe(rename('components.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'))
})

gulp.task('images', () => gulp.src('public/styles/images/png/*.png')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 7
    }))
    .pipe(gulp.dest('public/styles/images/min'))
)

gulp.task('imagesJPG', () => gulp.src('public/styles/images/*.jpg')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 7
    }))
    .pipe(gulp.dest('public/styles/images/min'))
)


gulp.task('sass', function () {
    return gulp.src('app/styles/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/styles/css/'))
})

gulp.task('watch', function () {
    gulp.watch('app/styles/scss/app/*.scss', ['sass'])
    gulp.watch('app/build/app/components/*.js', ['concat'])
    gulp.watch('app/components/*.js', ['sync'])
    gulp.watch('app/components/*.js', ['concat'])
})

gulp.task('default', ['AllScripts','sass', 'images', 'concat', 'sprites', 'sync', 'watch', 'svg2png', 'imagesJPG'])
