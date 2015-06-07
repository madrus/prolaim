module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
            '../../bower_components/angular/angular.js',
            '../../bower_components/angular-route/angular-route.js',
            '../../bower_components/angular-resource/angular-resource.js',
            '../../bower_components/angular-ui-router/release/angular-ui-router.js',
            '../../bower_components/angular-mocks/angular-mocks.js',
            'tests/unit/specHelper.js',
            'app/app.module.js',
            'app/**/*.js',
            'tests/unit/**/*.js'
        ],

        exclude: [],

        autoWatch: true,

        frameworks: ['jasmine', 'mocha', 'chai'],

        plugins: [
            //'karma-chrome-launcher',
            //'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-mocha',
            'karma-chai'
        ],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        phantomjsLauncher: {
            // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
            exitOnResourceError: true
        },

        colors: true,

        // preprocessor matching files before serving them to the browser
        // available preprocessors: http://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/**/*.js': ['coverage']
        },

        //coverageReporter: {
        //    type: 'html',
        //    dir: 'coverage/'
        //},

        coverageReporter: {
            type: 'text'
            //file: 'output.txt'
        },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

        //LOG_INFO | LOG_ERROR | LOG_WARN | LOG_DEBUG | LOG_DISABLE
        logLevel: config.LOG_INFO,

        //junitReporter: {
        //    outputFile: 'test_out/unit.xml',
        //    suite: 'unit'
        //},

        singleRun: true
    });
};