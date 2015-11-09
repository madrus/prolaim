/*jshint -W117 */
(function () {

    'use strict';

    angular.module('prolaim')
        .factory('languageService', languageService);

    languageService.$inject = ['$rootScope'];

    function languageService($rootScope) {

        console.log('languageService: inside the service');

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
            } else {
                console.log('setLanguage called with same language = ' + language);
            }
        }

        function getLanguage() {
            var iso = $rootScope.language;
            console.log('$rootScope.language = ' + iso);
            return iso;
        }
    }

})();
