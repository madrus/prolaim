/*jshint -W117 */
(function () {
    'use strict';

    var core = angular.module('prolaim.core');
    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];

    function toastrConfig(toastr) {
        toastr.options.timeOut = 10000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[GulpPatterns Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Gulp Patterns',
        imageBasePath: '/images/photos/',
        unknownProductImageSource: 'unknown_product.jpg',
        language: 'ru'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$compileProvider', '$logProvider',
        'routerHelperProvider', 'exceptionHandlerProvider'];

    function configure($compileProvider, $logProvider,
        routerHelperProvider, exceptionHandlerProvider) {
        $compileProvider.debugInfoEnabled(true);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        configureStateHelper();

        //////////////////////////////////

        function configureStateHelper() {
            var resolveAlways = {
                ready: ready
            };

            // if we were not using $inject explicitely, we could also put a code hint
            ready.$inject = ['dataService'];

            function ready(dataService) {
                return dataService.ready();
            }

            routerHelperProvider.configure({
                docTitle: 'Gulp: ',
                resolveAlways: resolveAlways
            });
        }
    }
})();
