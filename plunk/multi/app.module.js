/*jshint -W117 */
var myApp = angular.module('myApp', [
    'ui.router',
    'LanguageController',
    'AboutController'
]);

myApp.run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState) {
            $state.previous = fromState;
        });
});

myApp.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/ru');

        $stateProvider

            .state('root', {
                abstract: true,
                views: {
                    "page-view": {
                        template: '<div ui-view></div>'
                    }, // THIS IS WHERE THE CHILD (PAGE) VIEWS WILL BE RENDERED
                    "login-status-view": {
                        template: '<div>This is the login status view</div>'
                    },
                    "site-status-view": {
                        template: '<div>This is the site status view</div>'
                    },
                    "debug-view": {
                        template: '<div>This is the debug view</div>'
                    }
                }
            })
            .state('root.lang', {
                url: '/:lang',
                templateUrl: 'home.html',
                controller: 'LanguageController',
                resolve: {
                    lang: [
                        '$stateParams',
                        function ($stateParams) {
                            return $stateParams.lang;
                        }
                    ]
                }
            })
            .state('root.lang.about', {
                url: '/about',
                templateUrl: 'about.html',
                controller: 'AboutController'
            });
    }]);

var module = angular.module('LanguageController', []);
module.$inject = ['$state', '$stateProvider'];
module.controller('LanguageController',
    function ($scope, $state, $stateParams) {
        switch ($stateParams.lang) {
        case 'ru':
            $scope.language = 'Russian';
            console.log($state.previous);
            $state.go($state.previous);
            break;
        case 'ua':
            $scope.language = 'Ukrainian';
            console.log($state.previous);
            $state.go($state.previous);
            break;
        }
    });

var module = angular.module('AboutController', []);
module.controller('AboutController',
    function ($scope, lang) {
        switch (lang) {
        case 'ru':
            $scope.language = 'Russian';
            break;
        case 'ua':
            $scope.language = 'Ukrainian';
            break;
        }
    });
