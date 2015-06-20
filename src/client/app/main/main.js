/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.main')
        .controller('Main', Main);

    Main.$inject = [
        'dataService', 'languageService', 'config'
    ];

    ////////////////////////////////////////////////////////

    /* @ngInject */
    function Main(dataService, languageService, config) {

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
