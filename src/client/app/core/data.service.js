(function() {
    'use strict';

    angular
        .module('prolaim.core')
        .factory('dataService', dataService);

    dataService.$inject = ['$http', '$location', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataService($http, $location, $q, exception, logger) {
        var readyPromise;

        var service = {
            getTranslation: getTranslation,
            ready: ready
        };

        return service;

        function getTranslation(pageName, language) {
            return $http.get('/api/' + pageName + '/' + language)
                .then(getTranslationComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getTranslation')(message);
                    $location.url('/');
                });

            function getTranslationComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promise) {
            return getReady()
                .then(function() {
                    return promise ? $q.all(promise) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
