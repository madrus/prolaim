/*jshint -W117 */
(function () {
    'use strict';

    var getLanguageFromPath = function (path) {
        if (!path) {
            return false;
        }
        var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
        if (languages[1]) {
            return languages[1];
        } else {
            return false;
        }
    };

    var getRestOfPath = function (path) {
        if (!path) {
            return false;
        }
        var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
        if (languages[2]) {
            return languages[2];
        } else {
            return false;
        }
    };

    // app.layout
    //
    var ShellController = function (TranslatorService, $scope, $location,
                                    $state/*, $stateParams, $urlMatcherFactory*/) {

        console.log('Inside ShellController');

        /* INIT */
        var path = $location.path();
        console.log('shell: path from $location: ' + path);
        var pageName = 'header';
        var vm = this;
        vm.navbarCollapsed = true;

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

        var onTranslated = function (data) {
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
        };

        var onError = function (reason) {
            vm.error = 'Could not translate';
        };

        vm.init = function (language) {
            vm.language = language;
            console.log('inside init language function');
        };

        var firstTime = false;

        vm.translate = function (language, firstTime) {
            var state = $state.current;
            path = $location.path(); // if path was not defined yet
            console.log('shell: path: ' + path);
            oldIso = getLanguageFromPath(path); // if oldIso was not defined yet
            console.log('shell: from path: language: ' + oldIso);
            console.log('shell: from flag: language: ' + language);
            iso = language; // save the choice
            var needToTranslate = firstTime || (iso !== oldIso);
            if (needToTranslate) { // no need to translate if no change
                TranslatorService.getTranslation(pageName, language).then(onTranslated, onError);
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
            $state.reload(state);
        };

        /* WATCH */
        var initWatch = function () {
            $scope.$watch(
                function () {
                    console.log('inside $watch: language is ' + vm.language);
                    return vm.language;
                },
                function (newLanguage) {
                    console.log('Watched language changed to ' + newLanguage);
                }
            );
        };

        /* ACTIVATE */
        var activate = function () {
            console.log('shell.module.js: translate activated with iso = ' + iso);
            firstTime = true;
            vm.translate(iso, firstTime);
            vm.init(iso);
        };

        activate();
        initWatch();
    };

    var module = angular.module('app.shell', []);
    //module.$inject = ['TranslatorService', '$location', '$stateProvider', '$urlMatcherFactory'];
    module.$inject = ['TranslatorService', '$location', '$stateProvider'];
    module.controller('ShellController', ShellController);
})();
