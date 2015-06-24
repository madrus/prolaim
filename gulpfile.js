/*jshint -W117 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({lazy: true}),
    _ = require('lodash'),
    args = require('yargs').argv,
    browserSync = require('browser-sync'),
    config = require('./gulp.config')(),
    del = require('del'),
    path = require('path'),
    port = process.env.PORT || config.defaultPort,
    reload = browserSync.reload,
    series = require('stream-series');

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
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
}

gulp.task('fonts', ['clean-fonts'], function () {
    log('FONTS: copy fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.temp + 'fonts'))
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function () {
    log('IMAGES: compressing and copying images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4})) // default is 3
        .pipe(gulp.dest(config.temp + 'images'))
        .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('styles', ['clean-styles'], function () {
    log('STYLES: compile Less --> CSS');

    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp + 'styles'))
        .pipe(reload({stream: true}));
});

gulp.task('clean', function (done) {
    var files = [].concat(
        config.build,
        config.temp
    );
    log('CLEAN: clean: ' + $.util.colors.blue(files));
    del(files, done);
});

gulp.task('clean-dev', function (done) {
    var files = [config.temp];
    log('CLEAN-DEV: clean: ' + $.util.colors.blue(files));
    del(files, done);
});

gulp.task('clean-build', function (done) {
    var files = [config.build];
    log('CLEAN-BUILD: clean: ' + $.util.colors.blue(files));
    del(files, done);
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

gulp.task('clean-template-cache', function (done) {
    clean(config.temp + 'templates.js', done);
});

gulp.task('clean-code', function (done) {
    var files = [].concat(
        config.temp + 'styles/**/*.css',
        config.temp + 'templates.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files, done);
});

gulp.task('less-watcher', function () {
    log('LESS-WATCHER: watching less files ');

    // watch the dirs (1st parm) and kick the tasks (2nd parm)
    gulp.watch([config.less], ['styles']);
});

gulp.task('template-cache', ['clean-template-cache'], function () {
    log('TEMPLATE-CACHE: create AngularJS $templateCache');

    return gulp
        .src(config.html)
        .pipe($.minifyHtml({
            empty: true
        })) // remove any empty tags in HTML
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp))
        .pipe(reload({stream: true}));
});

gulp.task('wiredep', ['vet'], function () {
    log('WIREDEP: inject bower css, js and app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;
    var modulesStream = gulp.src([
        config.clientApp + '**/*.module.js'
    ], {read: false});
    var restStream = gulp.src([
        config.clientApp + '**/*.js',
        '!' + config.clientApp + '**/*.module.js',
        '!' + config.clientApp + '**/*.spec.js'
    ], {read: false});

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(series(modulesStream, restStream)))
        // put index.html back where it belongs
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'template-cache'], function () {
    log('INJECT: inject the app css into the html and call wiredep, styles and template-cache');

    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css, {read: false})))
        .pipe($.inject(gulp.src(templateCache, {read: false}), {
            starttag: '<!-- inject:templates:js -->' // see index.html
        }))
        // put index.html back where it belongs
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['clean-build', 'inject'], function () {
    log('OPTIMIZE: optimize the javascript, css, html');
    var assets = $.useref.assets({searchPath: config.root});
    var cssFilter = $.filter('**/' + config.optimized.css);
    var jsLibFilter = $.filter('**/' + config.optimized.lib);
    var jsAppFilter = $.filter('**/' + config.optimized.app);

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets)
        // minify css
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        //minify lib.js
        .pipe(jsLibFilter)
        .pipe($.uglify())
        .pipe(jsLibFilter.restore())
        // minify app.js
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(jsAppFilter.restore())
        .pipe($.rev())// app.js --> app-1j88d80dkj.js
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace()) // change the injected name accordingly
        .pipe(gulp.dest(config.build))
        .pipe($.filesize())
        .pipe($.rev.manifest())
        .pipe(gulp.dest(config.build));
});

gulp.task('js-prettify', function () {
    return gulp
        .src(config.build + 'js/*.js')
        .pipe($.jsPrettify())
        .pipe($.print())
        .pipe(gulp.dest(config.temp + 'js/'));
});

gulp.task('build-dev', ['inject', 'fonts', 'images'], function () {
    log('BUILD-DEV: run "inject" task and copy fonts and images');

    var msg = {
        title: 'BUILD-DEV: gulp build-dev',
        subtitle: 'Deployed to the temp folder',
        message: 'You can now run "gulp serve-dev"'
    };
    log(msg);
    notify(msg);
});

gulp.task('build', ['optimize', 'fonts', 'images'], function () {
    log('BUILD: run "optimize" task and copy fonts and images');

    var msg = {
        title: 'BUILD: gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'You can now run "gulp serve-build"'
    };
    del(config.temp);
    log(msg);
    notify(msg);
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function () {
    var msg = 'BUMP: bump the version';
    var type = args.type || 'patch';
    var version = args.version;
    var options = {};

    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' to ' + type;
    }
    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.bump(options))
        .pipe($.print())
        .pipe(gulp.dest(config.root));
});

gulp.task('serve-dev', ['build-dev'], function () {
    log('SERVE-DEV: start serve in DEV mode');

    serve(true /* isDev */);
});

gulp.task('serve-build', ['build'], function () {
    log('SERVE-BUILD: start serve in BUILD mode');

    serve(false /* isDev */);
});

//////////////////////////////////////////////////////////////////////

function serve(isDev) {
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
        .on('start', function () {
            log('********* nodemon started');
            startBrowserSync(isDev);
        })
        .on('restart', function (ev) {
            log('********* nodemon restarted');
            log('********* files changed on restart:\n' + ev);
            vet();
            // wait for nodemon to restart
            setTimeout(function () {
                browserSync.notify('Reloading browser-sync now ...');
                reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('crash', function () {
            log('********* nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('********* nodemon exited cleanly');
        });
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync(isDev) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    if (isDev) {
        gulp.watch([config.less], ['styles'])
            .on('change', function (event) {
                changeEvent(event);
            });
        gulp.watch([config.js], ['wiredep'])
            .on('change', function (event) {
                changeEvent(event);
            });
        gulp.watch([config.html], ['template-cache'])
            .on('change', function (event) {
                changeEvent(event);
            });
        gulp.watch([config.index])
            .on('change', reload);
    } else {
        gulp.watch([config.less, config.js, config.html], ['optimize', reload])
            .on('change', function (event) {
                changeEvent(event);
            });
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.less, // don't watch less files
            config.temp + '**/*.css'
        ] : [], // don't watch these files in build mode
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug', // 'debug', 'info', 'warn' or 'silent'
        logPrefix: 'browser-sync: gulp-patterns',
        notify: true,
        reloadDelay: 500
    };

    browserSync(options);
}

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
