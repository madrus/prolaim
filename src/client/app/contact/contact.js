/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.contact')
        .controller('Contact', Contact);

    Contact.$inject = [
        'dataService', 'languageService', 'mapService', 'config'
    ];

    ////////////////////////////////////////////////////////

    function Contact(dataService, languageService, mapService, config) {

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
            mapService.getMap();
            var iso = languageService.getLanguage() || config.language;
            vm.translate(iso);
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
