/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.404')
        .controller('P404', P404);

    P404.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ///////////////////////////////////////////////////////////////

    /* @ngInject */
    function P404(translator, languageService, defaultSettings) {

        console.log('P404: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'P404';
        var defaultLanguage;

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Oops! Non-existing page';

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
