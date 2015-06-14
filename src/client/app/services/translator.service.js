/*jshint -W117 */
(function () {

    'use strict';

    /**
     * translatorResource service (only $resource dependency)
     * no functions exposed to the outside world
     */
    angular.module('prolaim')
        .service('translatorResource', translatorResource);

    translatorResource.$inject = ['$resource'];

    //////////////////////////////////////////////////////////////

    function translatorResource($resource) {
        var pathToJsonFile = '/src/server/data/:fileName';
        return $resource(pathToJsonFile);
    };

    /////////////////////////////////////////////////////////

    /**
     * translator service (no $resource dependency)
     * getTranslation function is exposed to the outside world
     * and returns a promise object
     */
    angular.module('prolaim')
        .factory('translator', translator);

    translator.$inject = ['translatorResource', '$q'];

    /////////////////////////////////////////////////////////////////////

    function translator(translatorResource, $q) {

        var service = {};

        service.getTranslation = getTranslation;

        return service;

        //////////////////////////////////

        function getTranslation(pageName, language) {

            var deferred = $q.defer();
            var msg = 'page \'' + pageName + '\' into \'' + language + '\'';
            console.log('translator: translating ' + msg);
            var languageJsonFileName = pageName + '.' + language + '.json';

            translatorResource.get({fileName: languageJsonFileName}).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }

})();
