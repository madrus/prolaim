/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.contact')
        .controller('Contact', Contact);

    Contact.$inject = [
        'dataService', 'languageService', 'mapService', 'config', 'logger'
    ];

    ////////////////////////////////////////////////////////

    function Contact(dataService, languageService, mapService, config, logger) {

        console.log('Contact: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'contact';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: config.language
        };
        vm.translate = translate;
        vm.prolaimMap = {};
        vm.title = 'Contact Prolaim';

        activate();

        ////////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage() || config.language;
            console.log('Contact: activated language = ' + iso);
            logger.info('Contact: activated language = ' + iso);
            vm.translate(iso);
            mapService.getMap();
        }

        function translate(language) {
            return dataService
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
