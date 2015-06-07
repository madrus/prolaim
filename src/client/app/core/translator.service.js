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

    function translatorResource($resource) {
        var pathToJsonFile = '/src/client/sources/translations/:fileName';
        return $resource(pathToJsonFile);
    };

    /////////////////////////////////////////////////////////

    /**
     * translator service (no $resource dependency)
     * getTranslation function is exposed to the outside world
     * and returns a promise object
     */
    angular.module('prolaim')
        .service('translator', translator);

    translator.$inject = ['translatorResource'];

    function translator(translatorResource) {

        this.getTranslation = getTranslation;

        //////////////////////////////////

        function getTranslation(pageName, language) {

            var msg = 'page \'' + pageName + '\' into \'' + language + '\'';
            console.log('translator: translating ' + msg);
            var languageJsonFileName = pageName + '.' + language + '.json';

            return translatorResource.get({fileName: languageJsonFileName}).$promise;
                //.then(function (data) {
                //    console.log('translation success');
                //    return data;
                //},
                //function (error) {
                //    console.log('translation failure:\n' + error);
                //});
        }
    }

})();
