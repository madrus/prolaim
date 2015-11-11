/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.contact')
        .controller('Contact', Contact);

    Contact.$inject = [
        '$rootScope', 'dataService', 'languageService', 'mapService', 'logger'
    ];

    function Contact($rootScope, dataService, languageService, mapService, logger) {

        console.log('CONTACT: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'contact';

        /* here we specify what the view needs */
        vm.data = {};
        vm.translate = translate;
        vm.prolaimMap = {};
        vm.title = 'Contact Prolaim';

        activate();

        ////////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            vm.translate(language);
            // console.log('Contact: activated language = ' + language);
            console.log('CONTACT: activated language = ' + language);
            mapService.getMap();
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, scope) {
                vm.translate(scope.language);
                logger.info('CONTACT: language changed to ' + scope.language);
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
