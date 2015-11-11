/*jshint -W117 */
(function () {

    'use strict';

    angular.module('prolaim')
        .factory('languageService', languageService);

    languageService.$inject = ['$rootScope', 'logger'];

    function languageService($rootScope, logger) {

        console.log('LANGUAGESERVICE: inside SERVICES');

        /*jshint validthis: true */
        var service = {
            getLanguage: getLanguage,
            setLanguage: setLanguage
        };
        
        return service;

        //////////////////////////////////

        function setLanguage(newLanguage) {
            if (newLanguage !== getLanguage()) {
                $rootScope.language = newLanguage;
                $rootScope.$broadcast('languageChanged', {
                    language: newLanguage
                });
                logger.info('LANGUAGESERVICE.setLanguage inside SERVICES: language changed to ' + newLanguage);
            } else {
                logger.info('LANGUAGESERVICE.setLanguage inside SERVICES: language stays ' + newLanguage);
            }
        }

        function getLanguage() {
            var iso = $rootScope.language;
            console.log('LANGUAGESERVICE.getLanguage inside SERVICES: $rootScope.language = ' + iso);
            return iso;
        }
    }

})();
