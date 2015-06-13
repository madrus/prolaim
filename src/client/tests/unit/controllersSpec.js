'use strict';

/* jasmine specs for controllers go here */
describe('Prolaim controllers tests: ', function () {

    /* declare service mocks */
    var translator, translatorSpy;

    beforeEach(module('prolaim'));
    //, function ($provide) {

    //translator = jasmine.createSpyObj('translator', ['getTranslation']);

    //    mockTranslator = {
    //        getTranslation: function (pageName, language) {
    //            deferred = $q.defer();
    //            deferred.resolve({language: language});
    //            return deferred.promise;
    //        }
    //    };
    //
    //    $provide.value("translator", mockTranslator);
    //
    //    // Create a "spy object" for our translatorMock.
    //    // This will isolate the controller we're testing from any other code.
    //    // we'll set up the returns for this later
    //    spyOn(mockTranslator, 'getTranslation').andCallThrough();
    //});

    /////////////////   SHELL CONTROLLER   /////////////////

    describe('ShellController', function () {

        var scope, state, httpBackend, controller;

        var location = {
            path: function (path) {
                return path ? path : '/ru';
            }
        };

        beforeEach(function () {

            // INJECT! This part is critical
            // $rootScope - injected to create a new $scope instance.
            // $controller - injected to create an instance of our controller.
            // $q - injected so we can create promises for our mocks.
            inject(function ($rootScope, $controller, $q, _$location_, _$httpBackend_, _$state_) {
                httpBackend = _$httpBackend_;
                scope = $rootScope.$new();
                state = _$state_;
                location = _$location_;
                //location.path('/ru');

                // set up the returns for our translatorMock
                // $q.when('weee') creates a resolved promise to "weee".
                // this is important since our service is async and returns
                // a promise.
                //translatorMock.getTranslation.andReturn($q.when('weee'));

                controller = $controller('ShellController', {
                    $scope: scope,
                    $location: location,
                    $state: state,
                    translator: translator
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

    /////////////////   FOOTER CONTROLLER   /////////////////

    describe('FooterController', function () {

        var state, controller, stateParams;
        var scope;

        beforeEach(inject(function ($controller, $rootScope, _translator_) {

            scope = $rootScope.$new();
            translator = _translator_;

            stateParams = {
                language: ''
            };

            controller = $controller('FooterController', {
                translator: translator,
                $stateParams: stateParams
            });
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have translate function defined', function () {
            expect(angular.isFunction(controller.translate)).toBe(true);
        });

        it('should initially get the Russian translation', function () {
            controller.translate('ru').then(function () {
                console.log('footer: promise successfully resolved');
            }, function (error) {
                console.log('error in test:\n' + error);
            });
            expect(controller.language).toBe('ru');
        });
    });

    /////////////////   ABOUT CONTROLLER   /////////////////

    describe('About', function () {

        var state, controller, stateParams;
        var scope;

        beforeEach(inject(function ($controller, $rootScope, _translator_) {

            scope = $rootScope.$new();
            translator = _translator_;

            stateParams = {
                language: ''
            };

            controller = $controller('About', {
                translator: translator,
                $stateParams: stateParams
            });
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have translate function defined', function () {
            expect(angular.isFunction(controller.translate)).toBe(true);
        });

        it('should initially get the Russian translation', function () {
            controller.translate('ru').then(function () {
                console.log('footer: promise successfully resolved');
            }, function (error) {
                console.log('error in test:\n' + error);
            });
            expect(controller.language).toBe('ru');
        });
    });

    /////////////////   JOBS CONTROLLER   /////////////////

    describe('JobsController', function () {

        var state, controller, q, stateParams;
        var scope;

        beforeEach(inject(function ($controller, $rootScope, _$q_, _translator_) {

            scope = $rootScope.$new();
            translator = _translator_;
            q = _$q_;

            stateParams = {
                language: ''
            };

            controller = $controller('JobsController', {
                translator: translator,
                $stateParams: stateParams
            });
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have translate function defined', function () {
            expect(angular.isFunction(controller.translate)).toBe(true);
        });

        it('should initially get the Russian translation', function () {
            controller.translate('ru').then(function () {
                console.log('footer: promise successfully resolved');
            }, function (error) {
                console.log('error in test:\n' + error);
            });
            expect(controller.language).toBe('ru');
        });
    });

    /////////////////   LANGUAGE SERVICE   /////////////////

    describe('LanguageService', function () {

        var language, controller;
        var scope = {};

        beforeEach(inject(function ($controller, $rootScope) {

            scope = $rootScope.$new();

            controller = $controller('LanguageService', {
                $scope: scope
            });

        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have getTranslation method defined', function () {
            expect(angular.isFunction(controller.getLanguage)).toBe(true);
        });

        it('should determine that the current language is Russian', function () {
            expect(scope.language).toBeUndefined;
            scope.language = 'ru';
            var currentLanguage = controller.getLanguage();
            expect(angular.equals(currentLanguage, 'ru')).toBe(true);
        });

        it('should change the current language to Ukrainian', function () {
            controller.setLanguage('ua');
            var currentLanguage = controller.getLanguage();
            expect(angular.equals(currentLanguage, 'ua')).toBe(true);
        });
    });
});