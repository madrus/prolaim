/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.main')
        .controller('Main', Main);

    Main.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ////////////////////////////////////////////////////////

    /* @ngInject */
    function Main(translator, languageService, defaultSettings) {

        console.log('Main: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'main';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Prolaim main page';

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
