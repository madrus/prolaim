var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function ($stateProvider) {

    $stateProvider

        .state('home', {
            //name: 'home',
            // abstract: true,
            url: '/home',
            templateUrl: 'shell.html'
        });

    //$stateProvider.state(home);
});

