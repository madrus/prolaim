'use strict';

/* jasmine specs for controllers go here */
describe('Prolaim controllers tests: ', function() {
    describe('ShellController as vm', function() {

        var scope, state, httpBackend, controller;

        var location = {
            path: function(path) {
                return path ? path : '/ru';
            }
        };

        /* declare service mocks */
        var translatorMock;

        beforeEach(function() {
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
            inject(function($rootScope, $controller, $q, _$location_, _$httpBackend_) {
                httpBackend = _$httpBackend_;

                scope = $rootScope.$new();
                scope.vm = {};
                location = _$location_;
                location.path('/ru');

                // set up the returns for our translatorMock
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

        it('should pass the dummy test', function() {
            expect(true).toBe(true);
        });

        it('should be defined', function() {

            //verify that the controller is there
            expect(controller).toBeDefined();
        });

        it('should publish controller instance into scope', function() {
            $controllerProvider.register('ShellController', function() {
                this.mark = 'vm';
            });

            var vm = $controller('ShellController as vm', {
                $scope: scope
            });
            expect(scope.vm).toBe(vm);
            expect(scope.vm.mark).toBe('vm');
        });

        it('should show that the default language is \'ru\'', function() {
            expect(scope.vm.language).toBe('ru');
        });
    });
});