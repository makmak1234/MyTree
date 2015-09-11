var gulp = require('gulp');  
var browserify = require('gulp-browserify');  
var concat = require('gulp-concat');  
var styl = require('gulp-styl');  
var refresh = require('gulp-livereload'); 
var concatCss = require('gulp-concat-css'); 
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var lr = require('tiny-lr');  
var server = lr();

gulp.task('scripts', function() {  
    gulp.src(['src/**/*.js'])
        .pipe(browserify())
        .pipe(concat('dest.js'))
        .pipe(uglify({
            sequences     : false,  // join consecutive statemets with the “comma operator”
            properties    : false,  // optimize property access: a["foo"] → a.foo
            dead_code     : false,  // discard unreachable code
            drop_debugger : false,  // discard “debugger” statements
            unsafe        : false, // some unsafe optimizations (see below)
            conditionals  : false,  // optimize if-s and conditional expressions
            comparisons   : false,  // optimize comparisons
            evaluate      : false,  // evaluate constant expressions
            booleans      : false,  // optimize boolean expressions
            loops         : false,  // optimize loops
            unused        : false,  // drop unused variables/functions
            hoist_funs    : false,  // hoist function declarations
            hoist_vars    : false, // hoist variable declarations
            if_return     : false,  // optimize if-s followed by return/continue
            join_vars     : false,  // join var declarations
            cascade       : false,  // try to cascade `right` into `left` in sequences
            side_effects  : false,  // drop side-effect-free statements
            warnings      : false,  // warn about potentially dangerous optimizations/code
            global_defs   : { DEBUG: false}   
        }))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server))
})

gulp.task('sass', function () {
  return sass('css/sass')
    .on('error', sass.logError)
    .pipe(gulp.dest('css'));
});

gulp.task('styles', function() {  
    gulp.src(['css/**/*.css'])
        .pipe(concatCss('build.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(styl({compress : true}))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server))
})

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('default', function() {  
    gulp.run('lr-server', 'scripts', 'styles', 'sass');

    gulp.watch('src/**', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('css/sass/**', function(event) {
        gulp.run('sass');
    })

     gulp.watch('css/**', function(event) {
        gulp.run('styles');
    })
})