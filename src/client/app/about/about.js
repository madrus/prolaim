/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.about')
        .controller('About', About);

    About.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ///////////////////////////////////////////////////////////////

    /* @ngInject */
    function About(translator, languageService, defaultSettings) {

        console.log('About: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'about';
        var defaultLanguage;

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'About Prolaim';

        activate();

        ////////////////////////////////////////////

        function activate() {
            console.log('defaultSettings.language = ' + defaultSettings.language);
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
