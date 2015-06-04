/*jshint -W117 */
(function () {
    'use strict';

    var module = angular.module('app')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['TranslatorService', '$rootScope', '$stateParams'];

    function AboutController(TranslatorService, $rootScope, $stateParams) {

        console.log('AboutController');

        /*jshint validthis: true */
        var vm = this;
        vm.translate = translate;

        // init
        var oldIso = $stateParams.language;
        console.log('about: $stateParams.language: ' + oldIso);

        var iso = oldIso || 'ua';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ua';
        }

        activate();

        ////////////////////////////////////////////

        function activate() {
            vm.translate(iso);
        }

        function onTranslated(data) {
            if (data) {
                vm.data = data;
                vm.language = iso;
            } else {
                console.log('No data available from the translator');
            }
        }

        function onError(reason) {
            vm.error = 'Could not translate: ' + reason;
        }

        function translate(language) {
            var pageName = 'about';
            oldIso = $stateParams.language; // if oldIso was not defined yet
            console.log('about: translate: oldIso: ' + oldIso);
            console.log('about: translate: language: ' + language);
            iso = language;
            TranslatorService.getTranslation(pageName, language).then(onTranslated, onError);
        }
    }

})();
