/*jshint -W117 */
'use strict';

/* jasmine specs for services go here */

describe('Prolaim services tests: ', function () {

    // Load your module
    beforeEach(function () {
        module('prolaim.core');
    });

    /////////////////   DATASERVICE   /////////////////

    describe('dataService ->', function () {
        var scope, dataService, $httpBackend, $rootScope, pageName, language, data;
        var jsonResource = '/api';

        // Load inject
        beforeEach(function () {
            inject(function (_dataService_, _$httpBackend_, _$rootScope_) {
                dataService = _dataService_;
                $httpBackend = _$httpBackend_;
                //$httpFlush = $httpBackend.flush;
                $rootScope = _$rootScope_;
            });

            scope = $rootScope.$new();

            spyOn(dataService, 'getTranslation').and.callThrough();
        });

        it('should be defined', function () {
            expect(dataService).toBeDefined();
        });

        describe('"getTranslation" function', function () {
            it('should exist', function () {
                expect(dataService.getTranslation).toBeDefined();
                expect(dataService.getTranslation).toEqual(jasmine.any(Function));
                expect(angular.isFunction(dataService.getTranslation)).toBe(true);
            });

            // xit = disable
            it('"getTranslation" should be called with "jobs" and "ru"', function () {
                pageName = 'jobs';
                language = 'ru';
                dataService.getTranslation(pageName, language);
                expect(dataService.getTranslation).toHaveBeenCalled();
                expect(dataService.getTranslation).toHaveBeenCalledWith('jobs', 'ru');
            });

            using('language', [
                ['ru', 'Вакансии в ЧП «ПРОЛАЙМ»'],
                ['ua', 'Вакансії в ПП «ПРОЛАЙМ»']
            ], function (language, expectedTitle) {
                it('should get the right jobs page title translation for "' + language + '"',
                    function (done) {
                        expect(testJobsTitle(language, expectedTitle, done)).toBeTruthy();
                    });
            });
        });

        describe('"ready" function', function () {
            it('should exist', function () {
                expect(dataService.ready).toBeDefined();
                expect(dataService.ready).toEqual(jasmine.any(Function));
                expect(angular.isFunction(dataService.ready)).toBe(true);
            });

            it('should return a resolved promise with the dataService itself', function (done) {
                dataService.ready().then(function (data) {
                    expect(data).toEqual(dataService);
                }).then(done, done);
                $rootScope.$apply(); // no $http so just flush
            });
        });

        /////////////////////////////////////////////////////////

        function testJobsTitle(language, expectedTitle, done) {
            var result;
            var mockData = {
                TITLE: expectedTitle
            };

            pageName = 'jobs';
            var jsonPath = jsonResource + '/' + pageName + '/' + language;

            $httpBackend
                .expectGET(jsonPath)
                .respond(200, mockData);

            dataService
                .getTranslation(pageName, language)
                .then(testTranslation, failTest)
                //.catch(failTest)
                .finally(done);

            $httpBackend.flush();

            return result;

            //////////////////////////////////////////

            function testTranslation(data) {
                //console.log('test started:\n' + JSON.stringify(data));

                if (data) {
                    scope.data = data;
                    result = true;
                } else {
                    console.log('No data available from the dataService');
                }

                expect(!angular.equals(scope.data), undefined);
                expect(angular.equals(scope.data.TITLE, mockData.TITLE)).toBe(true);
            }

            function failTest(error) {
                expect(error).toBeUndefined();
            }
        }
    });

    /////////////////   LANGUAGE SERVICE   /////////////////

    describe('languageService', function () {
        var languageService, $rootScope, language;

        // Load inject
        beforeEach(function () {

            inject(function (_languageService_, _$rootScope_) {
                languageService = _languageService_;
                $rootScope = _$rootScope_;
            });
        });

        it('should be defined', function () {
            expect(languageService).toBeDefined();
        });

        describe('"getLanguage" function', function () {
            it('should exist', function () {
                expect(angular.isFunction(languageService.getLanguage)).toBe(true);
            });

            it('should determine that the initial language is undefined', function () {
                expect(!angular.equals($rootScope.language), undefined);
                var currentLanguage = languageService.getLanguage();
                expect(angular.equals(currentLanguage, undefined)).toBe(true);
            });

            it('should determine that the language set via $rootScope is Russian', function () {
                expect(!angular.equals($rootScope.language), undefined);
                $rootScope.language = 'ru';
                var currentLanguage = languageService.getLanguage();
                expect(angular.equals(currentLanguage, 'ru')).toBe(true);
            });
        });

        describe('"setLanguage" function', function () {
            it('should exist', function () {
                expect(angular.isFunction(languageService.setLanguage)).toBe(true);
            });

            it('should change the current language to Ukrainian', function () {
                $rootScope.language = 'ru';
                var currentLanguage = languageService.getLanguage();
                expect(angular.equals(currentLanguage, 'ru')).toBe(true);
                languageService.setLanguage('ua');
                currentLanguage = languageService.getLanguage();
                expect(angular.equals(currentLanguage, 'ua')).toBe(true);
            });
        });
    });

    /////////////////   HELPER SERVICE   /////////////////

    describe('helper ->', function () {
        var helper, $rootScope;

        // Load inject
        beforeEach(function () {
            inject(function (_helper_, _$rootScope_) {
                helper = _helper_;
                $rootScope = _$rootScope_;
            });

            spyOn(helper, 'getLanguageFromPath').and.callThrough();
            spyOn(helper, 'getRestOfPath').and.callThrough();
        });

        it('should be defined', function () {
            expect(helper).toBeDefined();
        });

        describe('"getLanguageFromPath" function', function () {
            it('should exist', function () {
                expect(angular.isFunction(helper.getLanguageFromPath)).toBe(true);
            });
        });

        describe('"getRestOfPath" function', function () {
            it('should exist', function () {
                expect(angular.isFunction(helper.getRestOfPath)).toBe(true);
            });
        });
    });

    /////////////////   MAP SERVICE   /////////////////

    describe('mapService ->', function () {
        var mapService, $rootScope;

        // Load inject
        beforeEach(function () {
            inject(function (_mapService_, _$rootScope_) {
                mapService = _mapService_;
                $rootScope = _$rootScope_;
            });

            spyOn(mapService, 'getMap').and.callThrough();
        });

        it('should be defined', function () {
            expect(mapService).toBeDefined();
        });

        describe('"getMap" function', function () {
            it('should exist', function () {
                expect(angular.isFunction(mapService.getMap)).toBe(true);
            });
        });
    });
});
