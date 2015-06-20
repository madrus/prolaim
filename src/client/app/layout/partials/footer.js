/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.footer')
        .controller('Footer', Footer);

    Footer.$inject = [
        'dataService', 'languageService', 'defaultSettings'
    ];

    /////////////////////////////////////////////////////

    /* @ngInject */
    function Footer(dataService, languageService, defaultSettings) {
        console.log('Footer: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'footer';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Prolaim footer';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage() || defaultSettings.language;
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
