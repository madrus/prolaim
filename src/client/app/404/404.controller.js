/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.404')
        .controller('P404', P404);

    P404.$inject = [
        '$rootScope', 'dataService', 'languageService', 'logger'
    ];

    function P404($rootScope, dataService, languageService, logger) {

        console.log('P404: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'P404';

        /* here we specify what the view needs */
        vm.data = {};
        vm.title = 'Oops! Non-existing page';
        vm.translate = translate;

        activate();

        ////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            vm.translate(language);
            console.log('404: activated language = ' + language);
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, scope) {
                logger.info('404: language changed to ' + scope.language);
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
