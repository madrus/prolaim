/*jshint -W117 */
(function () {
    'use strict';

    angular
        .module('prolaim.core')
        .factory('languageService', languageService);

    languageService.$inject = ['$rootScope', 'logger'];

    ///////////////////////////////////////////////

    function languageService($rootScope, logger) {
        /*jshint validthis: true */
        var service = this;

        service.getLanguage = getLanguage;
        service.setLanguage = setLanguage;

        return service;

        //////////////////////////////////

        function setLanguage(language) {
            if (language !== getLanguage()) {
                $rootScope.language = language;
                console.log('setLanguage called. Language changed to ' + language);
                logger.info('Language changed to ' + language);
            }
        }

        function getLanguage() {
            var iso = $rootScope.language;
            console.log('$rootScope.language = ' + iso);
            return iso;
        }
    }

})();
