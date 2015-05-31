(function () {
    'use strict';

    var ContentController = function () {
        console.log('I\'m inside the ContentController placeholder');
    };

    var module = angular.module('app.content', []);
    module.controller('ContentController', ContentController);
})();
