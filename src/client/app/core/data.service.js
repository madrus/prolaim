(function () {
    'use strict';

    angular.module('app')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http'];

    function dataservice($http) {

        var service = {
            getJsonFile: getJsonFile
        };

        return service;

        /////////////////////////////////

        function getJsonFile(filePath) {
            var vm = this;
            vm.data = {};
            console.log('filePath: ' + filePath);

            return $http.get(filePath)
                .then(function (response) {
                    vm.data = response.data;
                    console.log('$http.get response.data:\n' + vm.data);
                    return vm.data;
                },
                function (reason) {
                    console.log('$http.get response.data: error\n' + reason);
                });
        }
    }
})();