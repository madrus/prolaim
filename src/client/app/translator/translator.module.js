/*jshint -W117 */
(function () {
    'use strict';

    var TranslatorFactory = function ($resource) {

        var getTranslation = function (pageName, language) {
            console.log('getTranslation triggered with pageName = \'' + pageName + '\' and language = ' + language);
            var languageFilePath = "sources/translations/" + pageName + "." + language + ".json";
            var translation = $resource(languageFilePath).get();
            return translation.$promise.then(function (data) {
                return data;
            });
        };

        return {
            getTranslation: getTranslation
        };
    };

    // attach translator to app as one of its modules
    var module = angular.module('app');
    // register the service with Angular
    // so, if any other controller looks for "translator", it will get back
    // this API (with getTranslation method exposed to the outside world)
    module.$inject = ['ngResource'];
    module.factory('TranslatorFactory', TranslatorFactory);

})();
