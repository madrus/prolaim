/*jshint -W117 */
(function () {

    'use strict';

    angular.module('prolaim')
        .controller('LanguageController', LanguageController);

    LanguageController.$inject = ['$scope'];

    ///////////////////////////////////////////////

    function LanguageController($scope) {

        console.log('LanguageController');

        /*jshint validthis: true */
        var vm = this;
        vm.getLanguage = getLanguage;
        vm.setLanguage = setLanguage;

        /* INIT */
        $scope.language = 'ru';

        //////////////////////////////////

        function setLanguage(language) {
            $scope.language = language;
            console.log('setLanguage clicked. Language changed to ' + $scope.language);
        }

        function getLanguage() {
            console.log('getLanguage called. Language is ' + $scope.language);
            return $scope.language;
        }
    }

})();
