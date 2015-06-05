/*jshint -W117 */
(function () {
    'use strict';

    angular.module('app')
        .service('translator', translator);

    translator.$inject = ['$resource'];

    function translator($resource) {
        var service = {
            getTranslation: getTranslation
        };

        return service;

        //////////////////////////////////

        function getTranslation(pageName, language) {
            var vm = this;
            vm.translation = {};
            var msg = 'page \'' + pageName + '\' into \'' + language + '\'';
            console.log('translator: translating ' + msg);
            var languageFilePath =
                '/src/client/sources/translations/' + pageName + '.' + language + '.json';
            var translation = $resource(languageFilePath).get();
            return translation.$promise.then(function (data) {
               return data;
            });
        }
    }

})();
