'use strict';

/* jasmine specs for routing go here */
describe('While routing the requested path, the route: ', function () {

    var $httpBackend, $location, $scope, $state, $templateCache, targetUrl;

    beforeEach(module('prolaim'));

    beforeEach(function () {

        // following
        // http://nikas.praninskas.com/angular/2014/09/27/
        // unit-testing-ui-router-configuration/

        inject(function ($rootScope, $controller, $q, _$location_, _$state_,
                         _$templateCache_, $injector, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $location = _$location_;
            $scope = $rootScope.$new();
            $state = _$state_;
            $templateCache = _$templateCache_;
        });

        /**
         * I have to expect all the partial views in between because
         * otherwise goTo fails with unexpected GET requests
         */
        $httpBackend.expectGET('/src/client/app/layout/shell.html').respond(200);
        $httpBackend.expectGET('/src/client/app/layout/header/header.html').respond(200);
        $httpBackend.expectGET('/src/client/app/layout/partials/sidebar.html').respond(200);
        $httpBackend.expectGET('/src/client/app/layout/partials/content.html').respond(200);
        $httpBackend.expectGET('/src/client/app/layout/partials/footer.html').respond(200);
        $httpBackend.expectGET('/src/client/app/layout/header/topnav.html').respond(200);
        $httpBackend.expectGET('/src/client/app/layout/header/navbar.html').respond(200);
        $httpBackend.expectGET('/src/client/app/layout/partials/dummy-content.html').respond(200);
    });

    describe('should go to the main state', function () {
        targetUrl = '/src/client/app/main/main.html';

        beforeEach(function () {
            angular.bind(self, mockTemplate, null, targetUrl);
        });

        it('when empty', function () {
            goTo('', targetUrl);
            expect($state.current.name).toEqual('shell.lang.content.main');
        });

        it('when \'\/\'', function () {
            goTo('/', targetUrl);
            expect($state.current.name).toEqual('shell.lang.content.main');
        });

        it('when \'\/ru\'', function () {
            goTo('/ru', targetUrl);
            expect($state.current.name).toEqual('shell.lang.content.main');
        });

        it('when \'\/ru/\'', function () {
            goTo('/ru/', targetUrl);
            expect($state.current.name).toEqual('shell.lang.content.main');
        });

        it('when \'\/ua\'', function () {
            goTo('/ua', targetUrl);
            expect($state.current.name).toEqual('shell.lang.content.main');
        });

        it('when \'\/ua\/\'', function () {
            goTo('/ua/', targetUrl);
            expect($state.current.name).toEqual('shell.lang.content.main');
        });
    });

    describe('otherwise', function () {
        var badUrl = '/someNonExistentUrl';

        beforeEach(function () {
            angular.bind(self, mockTemplate, null, '/src/client/app/404/404.html');
        });

        it('should go to the 404 state', function () {
            goTo(badUrl);
            expect($state.current.name).toEqual('shell.lang.content.404');
        });
        it('should not change the url when going to 404 state', function () {
            goTo(badUrl);
            expect($location.url()).toEqual(badUrl);
        });
    });

    ///////////////////////////////////////////////////////////////

    function mockTemplate(templateRoute, tmpl) {
        console.log('mockTemplate: templateRoute = ' + templateRoute + ', tmpl = ' + tmpl);
        $templateCache.put(templateRoute, tmpl || templateRoute);
    }

    function goTo(url, targetUrl) {
        $httpBackend.expectGET(targetUrl).respond(200);
        console.log('goTo: url = ' + (url ? url : 'empty url'));
        $location.url(url);
        $scope.$apply();
        $httpBackend.flush();
    }

    function goFrom(url) {
        console.log('goFrom: url = ' + url);
        return {
            toState: function (state, params) {
                $location.replace().url(url); //Don't actually trigger a reload
                $state.go(state, params);
                $scope.$apply();
            }
        };
    }

    function resolve(value) {
        console.log('resolve: value = ' + value);
        return {
            forStateAndView: function (state, view) {
                var viewDefinition = view
                    ? $state.get(state).views[view]
                    : $state.get(state);
                return $injector.invoke(viewDefinition.resolve[value]);
            }
        };
    }
});