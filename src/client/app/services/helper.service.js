/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim')
        .factory('helper', helper);

    /////////////////////////////////////////////////////////////

    function helper() {

        var service = {};

        service.getLanguageFromPath = getLanguageFromPath;
        service.getRestOfPath = getRestOfPath;

        return service;

        ////////////////////////////////////////////

        function getLanguageFromPath(path) {
            var language;

            if (!path) {
                return false;
            }

            var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (!languages || languages.length < 2) {
                language = false;
            } else {
                language = languages[1];
            }

            return language;
        }

        function getRestOfPath(path) {
            var rest;

            if (!path) {
                return false;
            }

            var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (!languages || languages.length < 3) {
                rest = false;
            } else {
                rest = languages[2];
            }

            return rest;
        }
    }
})();
