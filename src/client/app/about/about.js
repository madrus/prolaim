/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.about')
        .controller('About', About);

    About.$inject = [
        '$rootScope', 'dataService', 'languageService'
    ];

    ///////////////////////////////////////////////////////////////

    function About($rootScope, dataService, languageService) {

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
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, obj) {
                console.log('ABOUT.ON: language changed to ' + obj.language);
                translate(obj.language);
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
