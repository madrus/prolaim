/*jshint -W117 */
(function () {
    'use strict';

    angular
        .module('prolaim.core')
        .factory('helper', helper);

    helper.$inject = ['logger'];

    /////////////////////////////////////////////////////////////

    function helper(logger) {
        /*jshint validthis: true */
        var service = this;

        service.getLanguageFromPath = getLanguageFromPath;
        service.getRestOfPath = getRestOfPath;

        return service;

        ////////////////////////////////////////////

        function getLanguageFromPath(path) {
            if (!path) {
                return undefined;
            }
            var parts = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (!parts || parts.length < 2) {
                return undefined;
            } else {
                var language = parts[1];
                logger.info('getLanguageFromPath: language = ' + language);
                return language;
            }
        }

        function getRestOfPath(path) {
            if (!path) {
                return undefined;
            }
            var parts = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (!parts || parts.length < 3) {
                return undefined;
            } else {
                var rest = parts[2];
                logger.info('getLanguageFromPath: rest of path = ' + rest);
                return rest;
            }
        }
    }
})();
