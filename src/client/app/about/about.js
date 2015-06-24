/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.about')
        .controller('About', About);

    About.$inject = [
        'dataService', 'languageService', 'config'
    ];

    ///////////////////////////////////////////////////////////////

    function About(dataService, languageService, config) {

        console.log('About: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'about';
        var defaultLanguage;

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: config.language
        };
        vm.translate = translate;
        vm.title = 'About Prolaim';

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
