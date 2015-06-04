/*jshint -W117 */
(function () {
    'use strict';

    angular.module('app')
        .controller('JobsController', JobsController);

    JobsController.$inject = ['TranslatorService', '$stateParams'];

    function JobsController(TranslatorService, $stateParams) {

        console.log('JobsController');

        /*jshint validthis: true */
        var vm = this;
        vm.translate = translate;

        // init
        var iso = $stateParams.language || 'ru';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ru';
        }

        vm.translate(iso);

        //////////////////////////////////////////

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
            var pageName = 'jobs';
            iso = language;
            TranslatorService.getTranslation(pageName, iso).then(onTranslated, onError);
        }
    }

})();
