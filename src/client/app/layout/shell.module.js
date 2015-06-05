/*jshint -W117 */
(function () {
    'use strict';

    angular.module('app')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$scope', '$location', '$state', 'translator'];

    function ShellController($scope, $location, $state, translator) {

        console.log('ShellController');

        /*jshint validthis: true */
        var vm = this;
        vm.translate = translate;
        vm.init = init;
        vm.navbarCollapsed = true;

        /* INIT */
        var path = $location.path();
        console.log('shell: path from $location: ' + path);
        var firstTime = false;

        /* LANGUAGE and TRANSLATE */
        var oldIso = getLanguageFromPath(path);
        if (oldIso) {
            console.log('shell: language in path: ' + oldIso);
        } else {
            console.log('shell: no language in path');
        }

        var iso = oldIso || 'ru';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ru';
        }

        activate();
        initWatch();

        /////////////////////////////////////////

        function init(language) {
            vm.language = language;
            console.log('inside init language function');
        }

        /* WATCH */
        function initWatch() {
            $scope.$watch(
                function () {
                    console.log('inside $watch: language is ' + vm.language);
                    return vm.language;
                },
                function (newLanguage) {
                    console.log('Watched language changed to ' + newLanguage);
                }
            );
        }

        /* ACTIVATE */
        function activate() {
            console.log('shell.module.js: translate activated with iso = ' + iso);
            firstTime = true;
            vm.translate(iso, firstTime);
            vm.init(iso);
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

        function onTranslated(data) {
            if (data) {
                vm.data = data;
                vm.language = iso;
            } else {
                console.log('No data available from the translator');
            }
            if (iso !== oldIso) {
                $location.path(iso);
            }
            console.log('shell: path after relocation: ' + $location.path());
        }

        function onError(reason) {
            vm.error = 'Could not translate: ' + reason;
        }

        function translate(language, firstTime) {
            var pageName = 'header';
            var currentState = $state.current;
            path = $location.path(); // if path was not defined yet
            console.log('shell: path: ' + path);
            oldIso = getLanguageFromPath(path); // if oldIso was not defined yet
            //console.log('shell: from path: language: ' + oldIso);
            //console.log('shell: from flag: language: ' + language);

            iso = language; // save the choice
            var needToTranslate = firstTime || (iso !== oldIso);
            if (needToTranslate) { // no need to translate if no change
                //translator.getTranslation(pageName, language).then(onTranslated, onError);
                translator.getTranslation(pageName, language);
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
