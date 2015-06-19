/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim', [
        'ui.router',
        'ngResource',
        'prolaim.templates',
        'prolaim.shell',
        'prolaim.about',
        'prolaim.contact',
        'prolaim.jobs',
        'prolaim.main',
        'prolaim.partners',
        'prolaim.sidebar',
        'prolaim.content',
        'prolaim.footer',
        'prolaim.404'
    ]);

    angular.module('prolaim')
        .config(['$urlRouterProvider', '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {

                $urlRouterProvider
                    .when('', '/ru/main')
                    .when('/', '/ru/main')
                    .when('/ru', '/ru/main')
                    .when('/ru/', '/ru/main')
                    .when('/ua', '/ua/main')
                    .when('/ua/', '/ua/main')
                    //.otherwise('/ru/main');
                    .otherwise(function ($injector) {
                        $injector.get('$state')
                            .go('shell.lang.content.404', {}, {location: false});
                    });

                var shell = {
                    name: 'shell',
                    abstract: true,
                    url: '/',
                    templateUrl: '/src/client/app/layout/shell.html',
                    controller: 'Shell',
                    controllerAs: 'vm'
                };

                var language = {
                    name: 'shell.lang',
                    //url: '{language:[a-z]{2}}',
                    url: '{language:ru|ua}',
                    // These are the view definitions of the named views inside shell.html
                    // In such a way, they can be used as placeholders for other views below
                    views: {
                        'header@shell': {
                            templateUrl: '/src/client/app/layout/header/header.html'
                        },
                        'sidebar@shell': {
                            templateUrl: '/src/client/app/layout/partials/sidebar.html',
                            controller: 'Sidebar',
                            controllerAs: 'vm'
                        },
                        'content@shell': {
                            templateUrl: '/src/client/app/layout/partials/content.html',
                            controller: 'Content',
                            controllerAs: 'vm'
                        },
                        'footer@shell': {
                            templateUrl: '/src/client/app/layout/partials/footer.html',
                            controller: 'Footer',
                            controllerAs: 'vm'
                        },
                        'topnav@shell.lang': {
                            templateUrl: '/src/client/app/layout/header/topnav.html'
                        },
                        'navbar@shell.lang': {
                            templateUrl: '/src/client/app/layout/header/navbar.html'
                        }
                    },
                    resolve: {
                        language: function ($stateParams) {
                            return $stateParams.language;
                        }
                    }
                };

                var content = {
                    name: 'shell.lang.content',
                    url: '/',
                    abstract: true,
                    templateUrl: '/src/client/app/layout/partials/dummy-content.html'
                };

                var main = {
                    name: 'shell.lang.content.main',
                    url: 'main',
                    templateUrl: '/src/client/app/main/main.html',
                    controller: 'Main',
                    controllerAs: 'vm'
                };

                var about = {
                    name: 'shell.lang.content.about',
                    url: 'about',
                    templateUrl: '/src/client/app/about/about.html',
                    controller: 'About',
                    controllerAs: 'vm'
                };

                var jobs = {
                    name: 'shell.lang.content.jobs',
                    url: 'jobs',
                    templateUrl: '/src/client/app/jobs/jobs.html',
                    controller: 'Jobs',
                    controllerAs: 'vm'
                };

                var contact = {
                    name: 'shell.lang.content.contact',
                    url: 'contact',
                    templateUrl: '/src/client/app/contact/contact.html',
                    controller: 'Contact',
                    controllerAs: 'vm'
                };

                var partners = {
                    name: 'shell.lang.content.partners',
                    url: 'partners',
                    templateUrl: '/src/client/app/partners/partners.html',
                    controller: 'Partners',
                    controllerAs: 'vm'
                };

                var p404 = {
                    name: 'shell.lang.content.404',
                    url: '404',
                    templateUrl: '/src/client/app/404/404.html',
                    controller: 'P404',
                    controllerAs: 'vm'
                };

                $stateProvider.state(shell);
                $stateProvider.state(language);
                $stateProvider.state(content);
                $stateProvider.state(main);
                $stateProvider.state(about);
                $stateProvider.state(jobs);
                $stateProvider.state(contact);
                $stateProvider.state(partners);
                $stateProvider.state(p404);

            }]);

})();
