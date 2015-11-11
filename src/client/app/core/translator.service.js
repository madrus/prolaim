/*jshint -W117 */
(function () {

    'use strict';

    /**
     * translatorResource service (only $resource dependency)
     * no functions exposed to the outside world
     */
    angular.module('prolaim.core')
        .service('translatorResource', translatorResource);

    translatorResource.$inject = ['$resource'];

    function translatorResource($resource) {
        var pathToJsonFile = '/src/server/data/:fileName';
        var resource = $resource(pathToJsonFile);
        return resource;
    }

    /////////////////////////////////////////////////////////

    // TODO make separate modules for translatorResource and translator

    /**
     * translator service (no $resource dependency)
     * getTranslation function is exposed to the outside world
     * and returns a promise object
     */
    angular.module('prolaim.core')
        .factory('translator', translator);

    translator.$inject = ['translatorResource', '$q', 'logger'];

    function translator(translatorResource, $q, logger) {

        var service = {
            getTranslation: getTranslation
        };
        
        return service;

        /////////////////////////////////////////////////

        function getTranslation(pageName, language) {

            var promise;
            var deferred = $q.defer();
            var msg = 'page \'' + pageName + '\' into \'' + language + '\'';
            logger.info('TRANSLATOR.getTranslation: translating to ' + msg);
            var languageJsonFileName = pageName + '.' + language + '.json';

            translatorResource.get({
                    fileName: languageJsonFileName
                }).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            promise = deferred.promise;
            return promise;
        }
    }
})();
