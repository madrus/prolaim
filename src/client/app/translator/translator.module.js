/*jshint -W117 */
(function () {
    'use strict';

    angular.module('app')
        .service('TranslatorService', TranslatorService);

    TranslatorService.$inject = ['$resource', '$log'];

    function TranslatorService($resource, $log) {

        function getTranslation(pageName, language) {
            var msg = 'pageName = \'' + pageName + '\' and language = ' + language;
            $log.info('TranslatorService: ' + msg);
            var languageFilePath =
                '/src/client/sources/translations/' + pageName + '.' + language + '.json';
            var translation = $resource(languageFilePath).get();
            return translation.$promise.then(function (data) {
                return data;
            });
        }

        return {
            getTranslation: getTranslation
        };
    }

})();
