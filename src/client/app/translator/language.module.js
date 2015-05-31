/*jshint -W117 */
(function () {

    var LanguageController = function ($scope) {
        var lg = this;
        console.log("language = " + $scope.language);
        $scope.language = 'ru';

        lg.setLanguage = function (language) {
            $scope.language = language;
            console.log("setLanguage clicked. Language changed to " + $scope.language);
        }

        lg.getLanguage = function () {
            console.log("getLanguage called. Language is " + $scope.language);
            return $scope.language;
        }
    };

    var module = angular.module('app.language', []);
    module.$inject = ['$scope'];
    module.controller('LanguageController', LanguageController);

})();
