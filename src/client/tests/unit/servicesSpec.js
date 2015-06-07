'use strict';

/* jasmine specs for services go here */

describe('Prolaim services tests: ', function () {

    // Load your module
    beforeEach(function () {
        module('prolaim');
    });

    describe('translator ->', function () {
        var scope, translator, $httpBackend, $rootScope, pageName, language, data;
        var jobsRu = '/src/client/sources/translations/jobs.ru.json';
        var jobsUa = '/src/client/sources/translations/jobs.ua.json';

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
            //expect(translator.getTranslation).toBeDefined();
            //expect(translator.getTranslation).toEqual(jasmine.any(Function));
            expect(angular.isFunction(translator.getTranslation)).toBe(true);
        });

        // xit = disable
        it('getTranslation should have been called with \'jobs\' and \'ru\'', function () {
            pageName = 'jobs';
            language = 'ru';
            var titleRu = 'Вакансии в ЧП «ПРОЛАЙМ»';
            var mockData = {
                "TITLE": titleRu
            };
            $httpBackend.expect('GET', jobsRu).respond(200, mockData);
            translator.getTranslation(pageName, language).then(function (data) {
                data = data;
            });
            $httpBackend.flush();
            expect(translator.getTranslation).toHaveBeenCalled();
            expect(translator.getTranslation).toHaveBeenCalledWith('jobs', 'ru');
            expect(angular.equals(mockData.TITLE, data.TITLE));
        });

        it('getTranslation should get the right translations of the Russian jobs page title', function (done) {
            pageName = 'jobs';
            language = 'ru';
            var titleRu = 'Вакансии в ЧП «ПРОЛАЙМ»';

            function testTranslation(data) {
                console.log('test started:\n' + JSON.stringify(data));

                if (data) {
                    scope.data = data;
                } else {
                    console.log('No data available from the translator');
                }

                expect(scope.data).toBeDefined;
                expect(angular.equals(scope.data.TITLE, titleRu)).toBe(true);
            }

            function failTest(error) {
                console.log('test failed');
                expect(error).toBeUndefined();
            }

            $httpBackend
                .expectGET(jobsRu)
                .respond(200, data);

            translator
                .getTranslation(pageName, language)
                .then(testTranslation)
                .catch(failTest)
                .finally(done);

            $httpBackend.flush();

        });

        it('should get the right translations of the Ukrainian jobs page title', function () {
            pageName = 'jobs';
            language = 'ua';
            var titleUa = 'Вакансії в ПП «ПРОЛАЙМ»';
            translator.getTranslation(pageName, language).then(function (data) {
                data = data;
            });
            console.log('translated data = ' + data);
            expect(data.TITLE).toBe(titleUa);
        });
    });
});
