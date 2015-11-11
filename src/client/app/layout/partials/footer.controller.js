/*jshint -W117 */
(function () {
    'use strict';

    angular.module('shell.footer')
        .controller('Footer', Footer);

    Footer.$inject = [
        '$rootScope', 'dataService', 'languageService', 'logger'
    ];

    ///////////////////////////////////////////////////////////////////

    function Footer($rootScope, dataService, languageService, logger) {

        console.log('FOOTER: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'footer';

        /* here we specify what the view needs */
        vm.data = {};
        vm.title = 'Prolaim footer';
        vm.translate = translate;

        activate();

        ////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            vm.translate(language);
            console.log('FOOTER.activate: language = ' + language);
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, scope) {
                logger.info('FOOTER.initWatch: calling ' + scope.language + ' translation');
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
