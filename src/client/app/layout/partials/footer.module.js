(function () {
    'use strict';

    var FooterController = function (TranslatorService, $rootScope, $stateParams) {
        console.log('I\'m inside the FooterController placeholder');

        // init
        var oldIso = $stateParams.language;
        console.log('about: $stateParams.language: ' + oldIso);

        var iso = oldIso || 'ua';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ua';
        }

        var pageName = 'footer';
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
            oldIso = $stateParams.language; // if oldIso was not defined yet
            console.log('about: translate: oldIso: ' + oldIso);
            console.log('about: translate: language: ' + language);
            iso = language;
            TranslatorService.getTranslation(pageName, language).then(onTranslated, onError);
        };

        var activate = function () {
            vm.translate(iso);
        };

        activate();
    };

    var module = angular.module('app.footer', []);
    module.$inject = ['TranslatorService', '$rootScope', '$stateProvider'];
    module.controller('FooterController', FooterController);
})();
