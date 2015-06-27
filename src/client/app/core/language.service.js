/*jshint -W117 */
(function() {
    'use strict';

    angular
        .module('prolaim.core')
        .factory('languageService', languageService);

    languageService.$inject = ['$rootScope', 'logger', 'config'];

    ///////////////////////////////////////////////

    function languageService($rootScope, logger, config) {
        /*jshint validthis: true */
        var service = this;

        service.getLanguage = getLanguage;
        service.setLanguage = setLanguage;

        return service;

        //////////////////////////////////

        function setLanguage(newLanguage) {
            if (newLanguage !== getLanguage()) {
                $rootScope.language = newLanguage;
                $rootScope.$broadcast('languageChanged', {
                    language: newLanguage
                });
                console.log('$rootScope.language changed to ' + newLanguage);
                logger.info('Language changed to ' + getLanguage());
            }
        }

        function getLanguage() {
            var currentLanguage = $rootScope.language;
            console.log('$rootScope.language = ' + currentLanguage);
            if (!currentLanguage) {
                currentLanguage = config.language;
            }
            return currentLanguage;
        }
    }

})();
