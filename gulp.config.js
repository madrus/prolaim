/*jshint -W117 */
module.exports = function () {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var server = './src/server/';
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
        css: temp + 'styles/styles.css',
        fonts: './bower_components/bootstrap/fonts/*.*',
        images: client + 'images/**/*.*',
        htmlTemplates: clientApp + '**/*.html',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        // Less files to compile (if more than 1, use [])
        less: client + 'styles/styles.less',
        server: server,
        temp: temp,

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
