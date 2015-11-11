/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.jobs')
        .controller('Jobs', Jobs);

    Jobs.$inject = [
        '$rootScope', 'dataService', 'languageService', 'logger'
    ];

    function Jobs($rootScope, dataService, languageService, logger) {

        console.log('JOBS: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'jobs';

        /* here we specify what the view needs */
        vm.data = {};
        vm.title = 'Prolaim job offers';
        vm.translate = translate;

        activate();

        ////////////////////////////////////////////

        function activate() {
            var language = languageService.getLanguage();
            vm.translate(language);
            console.log('JOBS: activated language = ' + language);
            initWatch();
        }

        function initWatch() {
            $rootScope.$on('languageChanged', function (event, obj) {
                logger.info('JOBS: language changed to ' + obj.language);
                translate(obj.language);
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
