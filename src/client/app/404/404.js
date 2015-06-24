/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.404')
        .controller('P404', P404);

    P404.$inject = [
        'dataService', 'languageService', 'config'
    ];

    ///////////////////////////////////////////////////////////////

    function P404(dataService, languageService, config) {

        console.log('P404: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'P404';
        var defaultLanguage;

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: config.language
        };
        vm.translate = translate;
        vm.title = 'Oops! Non-existing page';

        activate();

        ////////////////////////////////////////////

        function activate() {
            console.log('defaultSettings.language = ' + config.language);
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
