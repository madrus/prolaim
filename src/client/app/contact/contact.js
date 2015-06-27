/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.contact')
        .controller('Contact', Contact);

    Contact.$inject = [
        '$rootScope', 'dataService', 'languageService', 'mapService', 'logger'
    ];

    ////////////////////////////////////////////////////////

    function Contact($rootScope, dataService, languageService, mapService, logger) {

        console.log('Contact: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'contact';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.prolaimMap = {};
        vm.title = 'Contact Prolaim';

        activate();

        ////////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            console.log('Contact: activated language = ' + language);
            logger.info('Contact: activated language = ' + language);
            vm.translate(language);
            mapService.getMap();
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, obj) {
                vm.translate(obj.language);
                console.log('CONTACT.ON: languageChanged to ' + obj.language);

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
