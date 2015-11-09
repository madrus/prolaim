/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.layout')
        .controller('Shell', Shell);

    Shell.$inject = [
        '$location', '$rootScope', 'dataService', 'languageService', 'helper', 'config', 'logger'
    ];

    function Shell($location, $rootScope, dataService, languageService, helper, config, logger) {

        console.log('Shell: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'header';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: undefined
        };
        vm.navbarCollapsed = true;
        vm.setLanguageAndTranslate = setLanguageAndTranslate;

        activate();

        /////////////////////////////////////////

        function activate() {
            var language = initLanguage();
            setLanguageAndTranslate(language);
            logger.info('LAYOUT.SHELL: relocating to /' + language + '/main');
            $location.url('/' + language + '/main').replace();
            initWatch();
        }

        function initLanguage() {
            var path = $location.path();
            var language = helper.getLanguageFromPath(path);
            language = language || config.language;
            return language;
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, obj) {
                translate(obj.language);
                logger.info('LAYOUT.SHELL: languageChanged to ' + obj.language);
            });
        }

        function setLanguageAndTranslate(newLanguage) {
            languageService.setLanguage(newLanguage);
            translate(newLanguage);
        }

        function translate(newLanguage) {
            logger.info('LAYOUT.SHELL: translate is called with language = ' + newLanguage);

            return dataService.getTranslation(pageName, newLanguage)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                    }
                });
        }
    }
})();
