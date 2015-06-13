/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.about')
        .controller('About', About);

    About.$inject = ['translator', 'languageService'];

    /////////////////////////////////////////////////

    /* @ngInject */
    function About(translator, languageService) {

        console.log('About: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'about';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'About Prolaim';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage();
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                    ;
                });
        }
    }

})();
