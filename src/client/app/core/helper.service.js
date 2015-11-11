/*jshint -W117 */
(function () {
    'use strict';

    angular
        .module('prolaim.core')
        .factory('helper', helper);

    function helper() {
        var service = {
            getLanguageFromPath: getLanguageFromPath,
            getRestOfPath: getRestOfPath
        };

        return service;

        ////////////////////////////////////////////

        function getLanguageFromPath(path) {
            if (!path) {
                return undefined;
            }
            // /ru or /ua optionally followed by /...
            var parts = path.match(/^\/(ru|ua)(\/.*)?/);
            if (!parts || parts.length < 2) {
                return undefined;
            } else {
                var language = parts[1];
                console.log('HELPER.getLanguageFromPath: language = ' + language);
                return language;
            }
        }

        function getRestOfPath(path) {
            if (!path) {
                return undefined;
            }

            // /ru or /ua optionally followed by /...
            var parts = path.match(/^\/(ru|ua)(\/.*)?/);
            if (!parts || parts.length < 3) {
                return undefined;
            } else {
                var rest = parts[2];
                console.log('HELPER.getRestOfPath: rest = ' + rest);
                return rest;
            }
        }
    }
})();
