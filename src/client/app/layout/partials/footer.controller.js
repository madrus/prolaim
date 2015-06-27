/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.layout')
        .controller('Footer', Footer);

    Footer.$inject = [
        '$rootScope', 'dataService', 'languageService'
    ];

    /////////////////////////////////////////////////////

    function Footer($rootScope, dataService, languageService) {
        console.log('Footer: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'footer';

        /* here we specify what the view needs */
        vm.data = {};
        vm.translate = translate;
        vm.title = 'Prolaim footer';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            vm.translate(language);
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function(event, obj) {
                console.log('FOOTER.ON: language changed to ' + obj.language);
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
