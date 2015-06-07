/*jshint -W117 */
(function () {
    'use strict';

    var module = angular.module('prolaim')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['translator', '$rootScope', '$stateParams'];

    function AboutController(translator, $rootScope, $stateParams) {

        console.log('AboutController');

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
            iso = language;
            translator.getTranslation(pageName, language).then(onTranslated, onError);
        }
    }

})();
