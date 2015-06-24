/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.shell')
        .controller('Shell', Shell);

    Shell.$inject = [
        '$rootScope', '$location', '$state',
        'dataService', 'languageService',
        'helper', 'config'
    ];

    function Shell($rootScope, $location, $state,
                   dataService, languageService,
                   helper, config) {

        console.log('Shell: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var language, oldIso, path;

        vm.data = {
            LANGUAGE: config.language
        };
        vm.setLanguageAndTranslate = setLanguageAndTranslate;
        vm.navbarCollapsed = true;

        activate();
        //initWatch();

        /////////////////////////////////////////

        function setLanguageAndTranslate(language) {
            languageService.setLanguage(language);
            translate(language);
            var currentState = $state.current;
            $state.reload(currentState); //TODO check if 'reload' is the way
        }

        function activate() {
            init();
            console.log('SHELL: translate is called with language ' + language);
            translate(language);
            $state.go('shell.lang.base.main');
        }

        /* INIT */
        function init() {
            console.log('inside init language function');

            //var path = $location.path();
            //console.log('shell: path from $location: ' + path);

            /* LANGUAGE and TRANSLATE */
            oldIso = helper.getLanguageFromPath(path);
            language = oldIso || config.language;
            languageService.setLanguage(language);
        }

        ///* WATCH */
        //function initWatch() {
        //    $rootScope.$watch('language', function (language) {
        //            console.log('$WATCH: watched language changed to ' + language);
        //            translate(language);
        //        }
        //    );
        //}

        function translate(language) {
            var pageName = 'header';
            //path = $location.path(); // if path was not defined yet
            //console.log('shell: path: ' + path);
            //oldIso = helper.getLanguageFromPath(path); // if oldIso was not defined yet
            //
            var iso = helper.getLanguageFromPath(path);
            if (!iso) {
                iso = 'ru';
            }
            //var rest = helper.getRestOfPath(path);
            //if (!rest) {
            //    rest = '';
            //}
            //
            //var newPath = '/' + iso + rest;
            //console.log('newPath: ' + newPath);

            //if (language !== oldIso) {
            //    console.log('relocating to ' + newPath);
            //    $location.path(newPath).replace();
            //}

            return dataService
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        if (language !== oldIso) {
                            $location.path(iso).replace();
                        }
                        console.log('shell: path after relocation: ' + $location.path());
                        return vm.data;
                    }
                });
        }
    }
})();
