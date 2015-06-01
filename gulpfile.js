var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');

gulp.task('vet', function () {
    log('VET: analyze source with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, ($.print())))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function () {
    log('STYLES: compile Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function (done) {
    clean(config.temp + '**/*.css', done);
});

gulp.task('less-watcher', function () {
    log('LESS-WATCHER: watching less files ');
    // watch the dirs (1st parm) and kick the tasks (2nd parm)
    gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function () {
    log('WIREDEP: inject bower css, js and app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        // put index.html back where it belongs
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function () {
    log('INJECT: inject the app css into the html and call wiredep');

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        // put index.html back where it belongs
        .pipe(gulp.dest(config.client));
});

//////////////////////////////////////////////////////////////////////

function clean(path, done) {
    log('CLEAN: clean ' + $.util.colors.blue(path));
    // del has a standard cb function as its second parameter
    del(path, done);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var prop in msg) {
            if (msg.hasOwnProperty(prop)) {
                $.util.log($.util.colors.blue(prop + ': ' + msg[prop]));
            }
        }
    } else {
        $.util.log($.util.colors.yellow(msg));
    }
}
