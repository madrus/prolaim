'use strict';

/* jasmine specs for services go here */

describe('Prolaim services tests: ', function () {

    // Load your module
    beforeEach(function () {
        module('prolaim');
    });

    describe('translator ->', function () {
        var scope, translator, $httpBackend, $rootScope, pageName, language, data;
        var jsonResource = '/src/client/sources/translations/';

        // Load inject
        beforeEach(function () {
            inject(function (_translator_, _$httpBackend_, _$rootScope_) {
                translator = _translator_;
                $httpBackend = _$httpBackend_;
                $rootScope = _$rootScope_;
            });

            scope = $rootScope.$new();

            spyOn(translator, 'getTranslation').and.callThrough();
        });

        it('should be defined', function () {
            expect(translator).toBeDefined();
        });

        it('should have getTranslation method defined', function () {
            expect(translator.getTranslation).toBeDefined();
            expect(translator.getTranslation).toEqual(jasmine.any(Function));
            expect(angular.isFunction(translator.getTranslation)).toBe(true);
        });

        // xit = disable
        it('getTranslation should be called with \'jobs\' and \'ru\'', function () {
            pageName = 'jobs';
            language = 'ru';
            translator.getTranslation(pageName, language);
            expect(translator.getTranslation).toHaveBeenCalled();
            expect(translator.getTranslation).toHaveBeenCalledWith('jobs', 'ru');
        });

        using('language', [
            ["ru", 'Вакансии в ЧП «ПРОЛАЙМ»'],
            ["ua", 'Вакансії в ПП «ПРОЛАЙМ»']
        ], function (language, expectedTitle) {
            it('should get the right jobs page title translation for \'' + language + '\'',
                function (done) {
                expect(testJobsTitle(language, expectedTitle, done)).toBeTruthy();
            })
        })

        function testJobsTitle(language, expectedTitle, done) {
            var result;
            var mockData = {
                TITLE: expectedTitle
            };

            pageName = 'jobs';
            var jsonPath = jsonResource + pageName + '.' + language + '.json';

            $httpBackend
                .expectGET(jsonPath)
                .respond(200, mockData);

            translator
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
                    console.log('No data available from the translator');
                }

                expect(scope.data).toBeDefined;
                expect(angular.equals(scope.data.TITLE, mockData.TITLE)).toBe(true);
            }

            function failTest(error) {
                expect(error).toBeUndefined();
            }
        }
    });
});
