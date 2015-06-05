'use strict';

/* jasmine specs for services go here */

describe('Prolaim services tests: ', function () {

    describe('translator service', function () {
        var translator;

        // Load your module
        beforeEach(function () {
            module('app');

            inject(function (_translator_) {
                translator = _translator_;
            });
        });

        it('should be defined', function () {
            expect(translator).toBeDefined();
        });

        it('should have defined getTranslation method', function () {
            expect(translator.getTranslation).toBeDefined();
            //expect(translator.getTranslation).toEqual(jasmine.any(Function));
            expect(angular.isFunction(translator.getTranslation)).toBe(true);
        });

        it('should get the right translations of the jobs page title', function() {
            var pageName = 'jobs';

            var language = 'ru';
            var titleRu = 'Вакансии в ЧП «ПРОЛАЙМ»';
            var translatedTitle = translator.getTranslation(pageName, language).TITLE;
            expect(translatedTitle).toBe(titleRu);

            language = 'ua';
            var titleUa = 'Вакансії в ПП «ПРОЛАЙМ»';
            translatedTitle = translator.getTranslation(pageName, language).TITLE;
            expect(translatedTitle).toBe(titleUa);
        });
    });
});
