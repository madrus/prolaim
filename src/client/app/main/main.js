/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.main')
        .controller('Main', Main);

    Main.$inject = [
        '$rootScope', 'dataService', 'languageService'
    ];

    ////////////////////////////////////////////////////////

    function Main($rootScope, dataService, languageService) {

        console.log('Main: inside the controller');

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
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, obj) {
                console.log('MAIN.ON: language changed to ' + obj.language);
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
