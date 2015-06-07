(function () {
    'use strict';

    angular.module('prolaim')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['translator', '$stateParams'];

    function FooterController(translator, $stateParams) {
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
            iso = language;
            translator.getTranslation(pageName, language).then(onTranslated, onError);
        }
    }

})();
