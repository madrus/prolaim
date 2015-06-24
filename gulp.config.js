/*jshint -W117 */
module.exports = function () {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var root = './';
    var server = './src/server/';
    var source = 'J:\/www\/ng\/prolaim\/';
    var temp = './.tmp/';

    ///////////////
    var config = {
        /**
         * Files paths
         */
        // all js to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/',
        client: client,
        clientApp: clientApp,
        css: temp + 'styles/styles.css',
        fonts: './bower_components/bootstrap/fonts/*.*',
        images: client + 'images/**/*.*',
        html: clientApp + '**/*.html',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        // Less files to compile (if more than 1, use [])
        less: client + 'styles/styles.less',
        root: root,
        server: server,
        source: source,
        temp: temp,

        /**
         * optimize files
         */
        optimized: {
            app: 'app.js',
            css: '*.css',
            lib: 'lib.js'
        },

        /**
         * templateCache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'prolaim.templates',
                standAlone: false,
                root: 'app/'
            }
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Bower and NPM locations
         * - I tried to exclude the bootstrap.css via 'exclude' option
         *   (using regex or string notation) but it did not work
         *   Finally, I used 'overrides' option in bower.json
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: ['../..']
        },
        /**
         * Node settings
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js',
        packages: [
            './package.json',
            './bower.json'
        ]
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
};
