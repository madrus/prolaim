/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.about')
        .controller('About', About);

    About.$inject = [
        '$rootScope', 'dataService', 'languageService', 'logger'
    ];

    function About($rootScope, dataService, languageService, logger) {

        console.log('About: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'about';

        /* here we specify what the view needs */
        vm.data = {};
        vm.title = 'About Prolaim';
        vm.translate = translate;

        activate();

        ////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            vm.translate(language);
            logger.info('ABOUT: activated language = ' + language);
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, scope) {
                logger.info('ABOUT: language changed to ' + scope.language);
                translate(scope.language);
            });
        }

        function translate(newLanguage) {
            return dataService.getTranslation(pageName, newLanguage)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();
