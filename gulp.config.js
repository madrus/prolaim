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
         */
        bower: {
            json: require('./bower.json'),
            directory: 'bower_components',
            exclude: ['/bower_components/bootstrap/dist/css/bootstrap.css'],
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
