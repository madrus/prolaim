'use strict';

/* jasmine specs for controllers go here */
describe('Prolaim controllers tests: ', function () {
    describe('ShellController as vm', function () {

        var scope, location, state, httpBackend, controller;

        /* declare service mocks */
        var translatorMock;

        beforeEach(function () {
            // Create a "spy object" for our translatorMock.
            // This will isolate the controller we're testing from
            // any other code.
            // we'll set up the returns for this later
            translatorMock = jasmine.createSpyObj('translator', ['getTranslation']);

            // load your controllers
            module('app');

            // INJECT! This part is critical
            // $rootScope - injected to create a new $scope instance.
            // $controller - injected to create an instance of our controller.
            // $q - injected so we can create promises for our mocks.
            inject(function ($rootScope, $controller, $q, _$location_, _$httpBackend_) {
                httpBackend = _$httpBackend_;

                //you should be expecting the get request url from the controller, not the route
                httpBackend.expectGET('data/' + stateparams.listingId + '.json').respond([{id: 1 }, {id: 2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}, {id:9}, {id:10}]);

                scope = $rootScope.$new();
                scope.vm = {};
                location = _$location_;

                // set up the returns for our someServiceMock
                // $q.when('weee') creates a resolved promise to "weee".
                // this is important since our service is async and returns
                // a promise.
                translatorMock.getTranslation.andReturn($q.when('weee'));

                controller = $controller('ShellController', {
                    $scope: scope,
                    $location: location,
                    translator: translatorMock
                });

                //it('should make sure the language is "ru"', inject(function($controller) {
                //  var scope = {},
                //      ctrl = $controller('ShellController', {$scope:scope});
                //
                //  expect(scope.phones.length).toBe(3);
                //}));
            })
        });

        it('should pass the dummy test', function () {
            expect(true).toBe(true);
        });

        it('should be defined', function () {

            //verify that the controller is there
            expect(controller).toBeDefined();
        });

        it('should publish controller instance into scope', function () {
            $controllerProvider.register('ShellController', function () {
                this.mark = 'vm';
            });

            var vm = $controller('ShellController as vm', {$scope: scope});
            expect(scope.vm).toBe(vm);
            expect(scope.vm.mark).toBe('vm');
        });

        it('should show that the default language is \'ru\'', function () {
            expect(scope.vm.language).toBe('ru');
        });
    });
});
