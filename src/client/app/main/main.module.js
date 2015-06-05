/*jshint -W117 */
(function () {
    'use strict';

    angular.module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['translator', '$stateParams'];

    function MainController(translator, $stateParams) {

        console.log('MainController');

        /*jshint validthis: true */
        var vm = this;
        vm.translate = translate;

        /* INIT */
        var iso = $stateParams.language || 'ru';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ru';
        }

        vm.translate(iso);

        /////////////////////////////////////

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
            var pageName = 'main';
            iso = language;
            //translator.getTranslation(pageName, iso).then(onTranslated, onError);
            translator.getTranslation(pageName, iso);
        }
    }

})();
