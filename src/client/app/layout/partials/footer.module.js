(function () {
    'use strict';

    angular.module('app')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['TranslatorService', '$stateParams'];

    function FooterController(TranslatorService, $stateParams) {
        console.log('FooterController');

        /*jshint validthis: true */
        var vm = this;
        vm.translate = translate;

        // init
        var oldIso = $stateParams.language;
        console.log('about: $stateParams.language: ' + oldIso);

        var iso = oldIso || 'ru';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ru';
        }

        activate(iso);

        ////////////////////////////////////////

        function activate(iso) {
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
            var pageName = 'footer';
            oldIso = $stateParams.language; // if oldIso was not defined yet
            console.log('about: translate: oldIso: ' + oldIso);
            console.log('about: translate: language: ' + language);
            iso = language;
            TranslatorService.getTranslation(pageName, language).then(onTranslated, onError);
        }
    }

})();
