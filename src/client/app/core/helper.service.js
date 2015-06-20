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
            if (!path) {
                return false;
            }
            var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (!languages || languages.length < 2) {
                return false;
            } else {
                return languages[1];
            }
        }

        function getRestOfPath(path) {
            if (!path) {
                return false;
            }
            var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (!languages || languages.length < 3) {
                return false;
            } else {
                return languages[2];
            }
        }
    }
})();
