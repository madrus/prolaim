/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.partners')
        .controller('Partners', Partners);

    Partners.$inject = [
        '$rootScope', 'dataService', 'languageService', 'logger'
    ];
    
    /////////////////////////////////////////////////////////////////////

    function Partners($rootScope, dataService, languageService, logger) {

        console.log('PARTNERS: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'partners';

        /* here we specify what the view needs */
        vm.data = {};
        vm.title = 'Partners of Prolaim';
        vm.translate = translate;

        activate();

        ////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            vm.translate(language);
            logger.info('PARTNERS.activate: language = ' + language);
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, scope) {
                logger.info('PARTNERS.initWatch: calling ' + scope.language + ' translation');
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
