/*jshint -W117 */
(function () {
    'use strict';

    angular.module('app')
        .factory('translator', translator);

    translator.$inject = ['$resource', 'dataservice'];

    function translator($resource, dataservice) {
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
            //var translation = $resource(languageFilePath).get();
            var translation;
            dataservice.getJsonFile(languageFilePath).then(function(data){
                vm.translation = data;
            });
            console.log('translator: from dataservice:\n' + vm.translation);
            return vm.translation;
            //return translation.$promise.then(function (data) {
            //    return data;
            //});
        }
    }

})();
