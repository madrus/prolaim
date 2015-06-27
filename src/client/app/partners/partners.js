/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.partners')
        .controller('Partners', Partners);

    Partners.$inject = [
        '$rootScope', 'dataService', 'languageService'
    ];

    ///////////////////////////////////////////////////////

    function Partners($rootScope, dataService, languageService) {

        console.log('Partners: inside the controller');

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
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, obj) {
                console.log('PARTNERS.ON: language changed to ' + obj.language);
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
