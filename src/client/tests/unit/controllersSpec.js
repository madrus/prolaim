/*jshint -W117 */
'use strict';

/* jasmine specs for controllers go here */
describe('Prolaim controllers tests: ', function () {

    /* declare service mocks */
    var data, dataServiceMock, languageServiceMock, deferred;

    beforeEach(module('prolaim'));

    beforeEach(function () {
        data = {
            LANGUAGE: 'ru'
        };
    });

    //dataService = jasmine.createSpyObj('dataService', ['getTranslation']);
    //, function ($provide) {

    //
    //mockdataService = {
    //    getTranslation: function (pageName, language) {
    //        deferred = $q.defer();
    //        deferred.resolve({language: language});
    //        return deferred.promise;
    //    }
    //};
    //
    //$provide.value("dataService", mockdataService);

    // Create a "spy object" for our dataServiceMock.
    // This will isolate the controller we're testing from any other code.
    // we'll set up the returns for this later
    //spyOn(mockdataService, 'getTranslation').andCallThrough();
    //});

    /////////////////   SHELL CONTROLLER   /////////////////

    describe('Shell', function () {

        var scope, state, controller, deferred;

        //var location = {
        //    path: function (path) {
        //        return path ? path : '/ru';
        //    }
        //};

        beforeEach(function () {

            // INJECT! This part is critical
            // $rootScope - injected to create a new $scope instance.
            // $controller - injected to create an instance of our controller.
            // $q - injected so we can create promises for our mocks.
            inject(function ($rootScope, $controller, $q, $location, $state) {
                deferred = $q.defer();
                scope = $rootScope.$new();
                scope.language = 'ru';
                state = $state;
                $location.path('/ru');

                dataServiceMock = {
                    getTranslation: function (language) {
                        console.log('dataServiceMock.getTranslation called');
                        deferred.resolve(data);
                        data.LANGUAGE = 'ru';
                        return deferred.promise;
                    }
                };

                languageServiceMock = {
                    getLanguage: function () {
                        console.log('languageServiceMock.getLanguage called');
                        return scope.language;
                    },
                    setLanguage: function (language) {
                        console.log('languageServiceMock.setLanguage called');
                        scope.language = language;
                    }
                };

                // set up the returns for our dataServiceMock
                // $q.when('weee') creates a resolved promise to "weee".
                // this is important since our service is async and returns
                // a promise.
                //dataServiceMock.getTranslation.andReturn($q.when('weee'));

                controller = $controller('Shell', {
                    dataService: dataServiceMock,
                    languageService: languageServiceMock,
                    $state: state,
                    $rootScope: scope
                });
            });
        });

        it('should pass the dummy test', function () {
            expect(true).toBe(true);
        });

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have "setLanguageAndTranslate" function defined', function () {
            expect(angular.isFunction(controller.setLanguageAndTranslate)).toBe(true);
        });

        it('should show that the default language is "ru"', function () {
            expect(controller.data.LANGUAGE).toBe('ru');
        });
    });

    /////////////////   FOOTER CONTROLLER   /////////////////

    describe('Footer', function () {

        var scope, state, controller;

        beforeEach(inject(function ($controller, $rootScope, $q) {

            scope = $rootScope.$new();
            deferred = $q.defer();

            dataServiceMock = {
                getTranslation: function (language) {
                    console.log('dataServiceMock.getTranslation called');
                    deferred.resolve(data);
                    return deferred.promise;
                }
            };

            controller = $controller('Footer', {
                dataService: dataServiceMock
            });

            //spyOn(dataService, 'getTranslation').andReturn(data);
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have "translate" function defined', function () {
            expect(angular.isFunction(controller.translate)).toBe(true);
        });

        it('should initially get the Russian translation', function () {
            scope.language = 'ru';
            deferred.resolve('success');
            scope.$apply();

            controller.translate('ru').then(function (data) {
                this.data = data;
            }, function (error) {
                console.log('error in test:\n' + error);
            });
            expect(controller.data.LANGUAGE).toBe('ru');
        });
    });

    /////////////////   ABOUT CONTROLLER   /////////////////

    describe('About', function () {

        var scope, state, controller;

        beforeEach(inject(function ($controller, $rootScope, $q) {

            scope = $rootScope.$new();
            deferred = $q.defer();

            dataServiceMock = {
                getTranslation: function (language) {
                    console.log('dataServiceMock.getTranslation called');
                    deferred.resolve(data);
                    return deferred.promise;
                }
            };

            controller = $controller('About', {
                dataService: dataServiceMock
            });

            //spyOn(dataService, 'getTranslation').andReturn(data);
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have "translate" function defined', function () {
            expect(angular.isFunction(controller.translate)).toBe(true);
        });

        it('should initially get the Russian translation', function () {
            scope.language = 'ru';
            deferred.resolve('success');
            scope.$apply();

            controller.translate('ru').then(function (data) {
                this.data = data;
            }, function (error) {
                console.log('error in test:\n' + error);
            });
            expect(controller.data.LANGUAGE).toBe('ru');
        });
    });

    /////////////////   JOBS CONTROLLER   /////////////////

    describe('Jobs', function () {

        var scope, state, controller;

        beforeEach(inject(function ($controller, $rootScope, $q) {

            scope = $rootScope.$new();
            deferred = $q.defer();

            dataServiceMock = {
                getTranslation: function (language) {
                    console.log('dataServiceMock.getTranslation called');
                    deferred.resolve(data);
                    return deferred.promise;
                }
            };

            controller = $controller('Jobs', {
                dataService: dataServiceMock
            });

            //spyOn(dataService, 'getTranslation').andReturn(data);
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have "translate" function defined', function () {
            expect(angular.isFunction(controller.translate)).toBe(true);
        });

        it('should initially get the Russian translation', function () {
            scope.language = 'ru';
            deferred.resolve('success');
            scope.$apply();

            controller.translate('ru').then(function (data) {
                this.data = data;
            }, function (error) {
                console.log('error in test:\n' + error);
            });
            expect(controller.data.LANGUAGE).toBe('ru');
        });
    });
});
