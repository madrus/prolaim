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
        var firstTime, iso, oldIso, path;

        vm.data = {
            language: ''
        };
        vm.setLanguageAndTranslate = setLanguageAndTranslate;
        vm.navbarCollapsed = true;

        activate();
        initWatch();

        /////////////////////////////////////////

        function setLanguageAndTranslate(language) {
            languageService.setLanguage(language);
            translate(language);
        }

        function activate() {
            init();
            console.log('shell: translate activated with language ' + iso);
            translate(iso);
        }

        /* INIT */
        function init() {
            console.log('inside init language function');

            var path = $location.path();
            console.log('shell: path from $location: ' + path);

            /* LANGUAGE and TRANSLATE */
            oldIso = helper.getLanguageFromPath(path);
            iso = oldIso || config.language;
            languageService.setLanguage(iso);
        }

        /* WATCH */
        function initWatch() {
            $rootScope.$watch('language', function (newLanguage) {
                    console.log('$WATCH: watched language changed to ' + newLanguage);
                    translate(newLanguage);
                }
            );
        }

        function translate(language) {
            var pageName = 'header';
            var currentState = $state.current;
            path = $location.path(); // if path was not defined yet
            console.log('shell: path: ' + path);
            oldIso = helper.getLanguageFromPath(path); // if oldIso was not defined yet
            iso = language; // save the choice

            dataService.getTranslation(pageName, language).then(function (data) {
                if (data) {
                    vm.data = data;
                    if (iso !== oldIso) {
                        $location.path(iso).replace();
                    }
                    console.log('shell: path after relocation: ' + $location.path());
                    return vm.data;
                }
            });

            var lang = helper.getLanguageFromPath(path);
            var rest = helper.getRestOfPath(path);
            //var urlMatcher = new $urlMatcherFactory.compile('^\/(ru|ua)(\/.*)?', {caseInsensitive: false});
            console.log('lang: ' + lang + ', rest: ' + rest);

            var newPath = '/' + iso + rest;
            console.log('newPath: ' + newPath);

            if (oldIso !== iso) {
                console.log('relocating to ' + newPath);
                $location.path(newPath).replace();
            }

            $state.reload(currentState); //TODO check if 'reload' is the way
        }
    }
})();
