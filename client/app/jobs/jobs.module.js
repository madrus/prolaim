/*jshint -W117 */
(function () {
    'use strict';

    // app.jobs
    //
    var JobsController = function (TranslatorFactory, $stateParams) {
        // init
        var iso = $stateParams.language || "ru";
        if (iso !== "ru" & iso !== "ua") {
            iso = "ru";
        }
        var pageName = "jobs";
        var vm = this;

        var onTranslated = function (data) {
            if (data) {
                vm.data = data;
                vm.language = iso;
            } else {
                console.log("No data available from the translator");
            }
        };

        var onError = function (reason) {
            vm.error = "Could not translate";
        };

        vm.translate = function (language) {
            iso = language;
            TranslatorFactory.getTranslation(pageName, iso).then(onTranslated, onError);
        };

        vm.translate(iso);
    };

    var module = angular.module('app.jobs', []);
    module.$inject = ['TranslatorFactory', '$stateParams'];
    module.controller('JobsController', JobsController);
})();
