module.exports = function () {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var config = {
        temp: temp,

        /**
         * Files paths
         */
        // all js to vet
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        client: client,
        css: temp + 'styles.css',
        fonts: 'bower_components/bootstrap/fonts/*.*',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'
        ],

        // Less files to compile (if more than 1, use [])
        less: client + 'styles/styles.less',

        /**
         * Bower and NPM locations
         * - I tried to exclude the bootstrap.css via 'exclude' option
         *   (using regex or string notation) but it did not work
         *   Finally, I used 'overrides' option in bower.json
         */
        bower: {
            json: require('./bower.json'),
            directory: 'bower_components',
            ignorePath: ['../..']
        }
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
