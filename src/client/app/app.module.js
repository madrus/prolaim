/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim', [
        'ui.router',
        'ngResource',
        'prolaim.shell',
        'prolaim.about',
        'prolaim.contact',
        'prolaim.jobs',
        'prolaim.main',
        'prolaim.partners',
        'prolaim.sidebar',
        'prolaim.content',
        'prolaim.footer'
    ]);

    //app.run([
    //    '$rootScope', '$state', '$stateParams',
    //    function ($rootScope, $state, $stateParams) {
    //
    //        // It's very handy to add references to $state and $stateParams to the $rootScope
    //        // so that you can access them from any scope within your applications.For example,
    //        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    //        // to active whenever 'contacts.list' or one of its decendents is active.
    //        $rootScope.$state = $state;
    //        $rootScope.$stateParams = $stateParams;
    //    }
    //]);

    angular.module('prolaim')
        .config(['$stateProvider', '$urlRouterProvider',
            function (/*$state,*/ $stateProvider, $urlRouterProvider) {

                $urlRouterProvider.when('/', '/ru/main');
                $urlRouterProvider.when('/:language/', '/:language/main');
                $urlRouterProvider.when('/:language', '/:language/main');
                $urlRouterProvider.otherwise('/ru/main');

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
                            controllerAs: 'vm'                        },
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

                $stateProvider.state(shell);
                $stateProvider.state(language);
                $stateProvider.state(content);
                $stateProvider.state(main);
                $stateProvider.state(about);
                $stateProvider.state(jobs);
                $stateProvider.state(contact);
                $stateProvider.state(partners);

            }]);

})();
