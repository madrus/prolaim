/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.shell')
        .controller('Shell', Shell);

    Shell.$inject = ['$rootScope', '$location', '$state', 'translator', 'languageService'];

    function Shell($rootScope, $location, $state, translator, languageService) {

        console.log('Shell: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var firstTime, iso, oldIso, path;

        vm.data = {
            language: ''
        }
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
            firstTime = true;
            translate(iso, firstTime);
        }

        /* INIT */
        function init() {
            console.log('inside init language function');

            var path = $location.path();
            console.log('shell: path from $location: ' + path);

            /* LANGUAGE and TRANSLATE */
            oldIso = getLanguageFromPath(path);
            if (oldIso) {
                console.log('shell: language in path: ' + oldIso);
            } else {
                console.log('shell: no language in path');
            }

            iso = oldIso || 'ru';
            if (iso !== 'ru' && iso !== 'ua') {
                iso = 'ru';
            }

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

        function getLanguageFromPath(path) {
            if (!path) {
                return false;
            }
            var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (languages[1]) {
                return languages[1];
            } else {
                return false;
            }
        }

        function getRestOfPath(path) {
            if (!path) {
                return false;
            }
            var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (languages[2]) {
                return languages[2];
            } else {
                return false;
            }
        }

        function translate(language, firstTime) {
            var pageName = 'header';
            var currentState = $state.current;
            path = $location.path(); // if path was not defined yet
            console.log('shell: path: ' + path);
            oldIso = getLanguageFromPath(path); // if oldIso was not defined yet

            iso = language; // save the choice
            var needToTranslate = firstTime || (iso !== oldIso);
            if (needToTranslate) { // no need to translate if no change
                translator.getTranslation(pageName, language).then(function (data) {
                    if (data) {
                        vm.data = data;
                        if (iso !== oldIso) {
                            $location.path(iso);
                        }
                        console.log('shell: path after relocation: ' + $location.path());
                        return vm.data;
                    }
                });
            }

            var lang = getLanguageFromPath(path);
            var rest = getRestOfPath(path);
            //var urlMatcher = new $urlMatcherFactory.compile('^\/(ru|ua)(\/.*)?', {caseInsensitive: false});
            console.log('lang: ' + lang + ', rest: ' + rest);

            var newPath = '/' + iso + rest;
            console.log('newPath: ' + newPath);

            if (oldIso !== iso) {
                console.log('relocating to ' + newPath);
                $location.path(newPath);
            }

            $state.reload(currentState); //TODO check if 'reload' is the way
        }
    }

})();
