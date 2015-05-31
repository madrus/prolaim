(function () {
    'use strict';

    var SidebarController = function () {
        console.log('I\'m inside the SidebarController placeholder');
    };

    var module = angular.module('app.sidebar', []);
    module.controller('SidebarController', SidebarController);
})();
