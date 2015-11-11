/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.main')
        .controller('Main', Main);

    Main.$inject = [
        '$rootScope', 'dataService', 'languageService', 'logger'
    ];

    ///////////////////////////////////////////////////////////////

    function Main($rootScope, dataService, languageService, logger) {

        console.log('MAIN: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'main';

        /* here we specify what the view needs */
        vm.data = {};
        vm.title = 'Prolaim main page';
        vm.translate = translate;

        activate();

        ////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            vm.translate(language);
            console.log('MAIN.activate: language = ' + language);
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, scope) {
                logger.info('MAIN.initWatch: calling ' + scope.language + ' translation');
                translate(scope.language);
            });
        }

        function translate(newLanguage) {
            return dataService
                .getTranslation(pageName, newLanguage)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();
