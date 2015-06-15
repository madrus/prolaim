'use strict';

/* jasmine specs for controllers go here */
describe('Prolaim controllers tests: ', function () {

    /* declare service mocks */
    var data, translatorMock, deferred;

    beforeEach(module('prolaim'));

    beforeEach(function () {
        data = {
            language: 'ru'
        };
    });

    //translator = jasmine.createSpyObj('translator', ['getTranslation']);
    //, function ($provide) {

    //
    //mockTranslator = {
    //    getTranslation: function (pageName, language) {
    //        deferred = $q.defer();
    //        deferred.resolve({language: language});
    //        return deferred.promise;
    //    }
    //};
    //
    //$provide.value("translator", mockTranslator);

    // Create a "spy object" for our translatorMock.
    // This will isolate the controller we're testing from any other code.
    // we'll set up the returns for this later
    //spyOn(mockTranslator, 'getTranslation').andCallThrough();
    //});

    /////////////////   UI ROUTING   /////////////////

    describe('PATH', function () {

        beforeEach(function () {

            inject(function ($rootScope, $controller, $q, $location, $state,
                             $templateCache, $injector) {
                deferred = $q.defer();
                // following
                // http://nikas.praninskas.com/angular/2014/09/27/
                // unit-testing-ui-router-configuration/

                function mockTemplate(templateRoute, tmpl) {
                    $templateCache.put(templateRoute, tmpl || templateRoute);
                }

                function goTo(url) {
                    $location.url(url);
                    $rootScope.$digest();
                }

                function goFrom(url) {
                    return {
                        toState: function (state, params) {
                            $location.replace().url(url); //Don't actually trigger a reload
                            $state.go(state, params);
                            $rootScope.$digest();
                        }
                    };
                }

                function resolve(value) {
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
        });

        describe('when empty', function () {

        });
        describe('otherwise', function () {
            beforeEach(mockTemplate.bind(null, '404/404.html'));
            it('should go to the 404 state', function () {
                goTo('someNonExistentUrl');
                expect($state.current.name).toEqual('shell.lang.content.404');
            });
            it('should not change the url', function () {
                var badUrl = '/someNonExistentUrl';
                goTo(badUrl);
                expect($location.url()).toEqual(badUrl);
            });
        });
    });


    /////////////////   SHELL CONTROLLER   /////////////////

    describe('Shell', function () {

        var scope, controller, deferred;

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
            inject(function ($rootScope, $controller, $q, $location, $state,
                             $templateCache, $injector) {
                scope = $rootScope.$new();
                deferred = $q.defer();
                //location.path('/ru');

                translatorMock = {
                    getTranslation: function (language) {
                        console.log('translatorMock.getTranslation called');
                        deferred.resolve(data);
                        return deferred.promise;
                    }
                };

                // set up the returns for our translatorMock
                // $q.when('weee') creates a resolved promise to "weee".
                // this is important since our service is async and returns
                // a promise.
                //translatorMock.getTranslation.andReturn($q.when('weee'));

                controller = $controller('Shell', {
                    translator: translatorMock
                });
            });
        });

        it('should pass the dummy test', function () {
            expect(true).toBe(true);
        });

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should show that the default language is \'ru\'', function () {
            expect(controller.data.language).toBe('ru');
        });
    });

    /////////////////   FOOTER CONTROLLER   /////////////////

    describe('Footer', function () {

        var scope, state, controller;

        beforeEach(inject(function ($controller, $rootScope, $q) {

            scope = $rootScope.$new();
            deferred = $q.defer();

            translatorMock = {
                getTranslation: function (language) {
                    console.log('translatorMock.getTranslation called');
                    deferred.resolve(data);
                    return deferred.promise;
                }
            };

            controller = $controller('Footer', {
                translator: translatorMock
            });

            //spyOn(translator, 'getTranslation').andReturn(data);
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have translate function defined', function () {
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
            expect(controller.data.language).toBe('ru');
        });
    });

    /////////////////   ABOUT CONTROLLER   /////////////////

    describe('About', function () {

        var scope, state, controller;

        beforeEach(inject(function ($controller, $rootScope, $q) {

            scope = $rootScope.$new();
            deferred = $q.defer();

            translatorMock = {
                getTranslation: function (language) {
                    console.log('translatorMock.getTranslation called');
                    deferred.resolve(data);
                    return deferred.promise;
                }
            };

            controller = $controller('About', {
                translator: translatorMock
            });

            //spyOn(translator, 'getTranslation').andReturn(data);
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have translate function defined', function () {
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
            expect(controller.data.language).toBe('ru');
        });
    });

    /////////////////   JOBS CONTROLLER   /////////////////

    describe('Jobs', function () {

        var scope, state, controller;

        beforeEach(inject(function ($controller, $rootScope, $q) {

            scope = $rootScope.$new();
            deferred = $q.defer();

            translatorMock = {
                getTranslation: function (language) {
                    console.log('translatorMock.getTranslation called');
                    deferred.resolve(data);
                    return deferred.promise;
                }
            };

            controller = $controller('Jobs', {
                translator: translatorMock
            });

            //spyOn(translator, 'getTranslation').andReturn(data);
        }));

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should have translate function defined', function () {
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
            expect(controller.data.language).toBe('ru');
        });
    });
});