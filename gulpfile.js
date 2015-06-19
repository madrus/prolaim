/*jshint -W117 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var _ = require('lodash');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var path = require('path');
var port = process.env.PORT || config.defaultPort;

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', vet);

function vet() {
    log('VET: analyze source with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, ($.print())))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
}

gulp.task('fonts', function () {
    log('FONTS: copy fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function () {
    log('IMAGES: compressing and copying images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4})) // default is 3
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('styles', ['clean-styles'], function () {
    log('STYLES: compile Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp + 'styles'));
});

gulp.task('clean', function (done) {
    var delConfig = [].concat(config.build, config.temp);
    log('CLEAN: clean: ' + $.util.colors.blue(delConfig));
    del(delConfig, done);
});

gulp.task('clean-fonts', function (done) {
    clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function (done) {
    clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean-styles', function (done) {
    clean(config.temp + 'styles/**/*.css', done);
});

gulp.task('clean-code', function (done) {
    var files = [].concat(
        config.temp + 'styles/**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files, done);
});

gulp.task('less-watcher', function () {
    log('LESS-WATCHER: watch less files ');

    // watch the dirs (1st parm) and kick the tasks (2nd parm)
    gulp.watch([config.less], ['styles']);
});

gulp.task('template-cache', ['clean-code'], function () {
    log('TEMPLATE-CACHE: create AngularJS $templateCache');

    return gulp
        .src(config.htmlTemplates)
        .pipe($.minifyHtml({empty: true})) // 'true' is very important with Angular
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function () {
    log('WIREDEP: inject bower css, js and app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js), {read: false}))
        // put index.html back where it belongs
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'template-cache'], function () {
    log('INJECT: inject the app css into the html and call wiredep');

    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->' // see index.html
        }))
        // put index.html back where it belongs
        .pipe(gulp.dest(config.client));
});

gulp.task('build', ['optimize', 'fonts', 'images'], function () {
    log('BUILD: run "optimize" task and copy fonts and images');

    var msg = {
        title: 'BUILD: gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'TODO: run "gulp serve-build"'
    };
    del(config.temp);
    log(msg);
    notify(msg);
});

gulp.task('optimize', ['inject'], function () {
    log('OPTIMIZE: optimize the javascript, css, html');
    var templateCache = config.temp + config.templateCache.file;
    var assets = $.useref.assets({searchPath: './'});

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe(gulp.dest(config.build));
});

gulp.task('serve-dev', ['inject'], function () {
    log('SERVE-DEV: start serve in DEV mode');
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1, // default value of John Papa
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('start', function() {
            log('********* nodemon started');
        })
        .on('restart', function(ev) {
            log('********* nodemon restarted');
            log('********* files changed on restart:\n' + ev);
            vet();
        })
        .on('crash', function() {
            log('********* nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('********* nodemon exited cleanly');
        });
});

//////////////////////////////////////////////////////////////////////

function clean(path, done) {
    log('CLEAN: clean ' + $.util.colors.blue(path));
    // del has a standard cb function as its second parameter
    del(path, done);
}

function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options); // assign is a lodash function
    notifier.notify(notifyOptions);
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
