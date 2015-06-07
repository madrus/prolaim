'use strict';

/* jasmine specs for controllers go here */
describe('Prolaim controllers tests: ', function () {

    beforeEach(module('prolaim'));

    describe('LanguageController', function () {

        var log, scope, language, controller, createController;
        scope = {};

        beforeEach(inject(function ($controller, $rootScope) {
            // create mocks
            //LanguageController
            //    = jasmine.createSpyObj('LanguageController',
            //    [
            //        'getLanguage',
            //        'setLanguage'
            //    ]);
            scope = $rootScope.$new();

            // Create the controller
            createController = function () {
                return $controller('LanguageController', {
                    $scope: scope
                });
            }
        }));

        it('should determine that the current language is Russian', function () {
            controller = createController();
            expect(scope.language).toBeUndefined;
            scope.language = 'ru';
            var currentLanguage = controller.getLanguage();
            expect(angular.equals(currentLanguage, 'ru')).toBe(true);
        });

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have getTranslation method defined', function () {
            expect(angular.isFunction(controller.getLanguage)).toBe(true);
            expect(angular.isFunction(controller.setLanguage)).toBe(true);
        });

        it('should change the current language to Ukrainian', function () {
            controller.setLanguage('ua');
            var currentLanguage = controller.getLanguage();
            expect(angular.equals(currentLanguage, 'ua')).toBe(true);
        });
    });

    describe('ShellController as vm', function () {

        var scope, state, httpBackend, controller;

        var location = {
            path: function (path) {
                return path ? path : '/ru';
            }
        };

        /* declare service mocks */
        var translatorMock;

        beforeEach(function () {
            // Create a "spy object" for our translatorMock.
            // This will isolate the controller we're testing from
            // any other code.
            // we'll set up the returns for this later
            translatorMock = jasmine.createSpyObj('translator', ['getTranslation']);

            // INJECT! This part is critical
            // $rootScope - injected to create a new $scope instance.
            // $controller - injected to create an instance of our controller.
            // $q - injected so we can create promises for our mocks.
            inject(function ($rootScope, $controller, $q, _$location_, _$httpBackend_) {
                httpBackend = _$httpBackend_;

                scope = $rootScope.$new();
                scope.vm = {};
                location = _$location_;
                location.path('/ru');

                // set up the returns for our translatorMock
                // $q.when('weee') creates a resolved promise to "weee".
                // this is important since our service is async and returns
                // a promise.
                //translatorMock.getTranslation.andReturn($q.when('weee'));

                controller = $controller('ShellController', {
                    $scope: scope,
                    $location: location,
                    translator: translatorMock
                });
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

            var vm = $controller('ShellController as vm', {
                $scope: scope
            });
            expect(scope.vm).toBe(vm);
            expect(scope.vm.mark).toBe('vm');
        });

        it('should show that the default language is \'ru\'', function () {
            expect(scope.vm.language).toBe('ru');
        });
    });
});