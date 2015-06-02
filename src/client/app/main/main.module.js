/*jshint -W117 */
(function () {
    'use strict';

    // app.main
    //
    var MainController = function (TranslatorService, $stateParams) {
        // init
        var iso = $stateParams.language || 'ru';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ru';
        }
        var pageName = 'main';
        var vm = this;

        var onTranslated = function (data) {
            if (data) {
                vm.data = data;
                vm.language = iso;
            } else {
                console.log('No data available from the translator');
            }
        };

        var onError = function (reason) {
            vm.error = 'Could not translate';
        };

        vm.translate = function (language) {
            iso = language;
            TranslatorService.getTranslation(pageName, iso).then(onTranslated, onError);
        };

        vm.translate(iso);
    };

    var module = angular.module('app.main', []);
    module.$inject = ['TranslatorService', '$stateParams'];
    module.controller('MainController', MainController);
})();
