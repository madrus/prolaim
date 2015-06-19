/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.jobs')
        .controller('Jobs', Jobs);

    Jobs.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ////////////////////////////////////////////////////////

    /* @ngInject */
    function Jobs(translator, languageService, defaultSettings) {

        console.log('Jobs: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'jobs';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Prolaim job offers';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage() || defaultSettings.language;
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();
