/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.partners')
        .controller('Partners', Partners);

    Partners.$inject = [
        'dataService', 'languageService', 'config'
    ];

    ///////////////////////////////////////////////////////

    /* @ngInject */
    function Partners(dataService, languageService, config) {

        console.log('Partners: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'partners';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Partners of Prolaim';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage() || config.language;
            vm.translate(iso);
        }

        function translate(language) {
            return dataService
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
