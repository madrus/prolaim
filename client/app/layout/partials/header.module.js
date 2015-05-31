(function () {
    'use strict';

    var HeaderController = function () {
        console.log('I\'m inside the HeaderController placeholder');
    };

    var module = angular.module('app.header', []);
    module.controller('HeaderController', HeaderController);
})();
