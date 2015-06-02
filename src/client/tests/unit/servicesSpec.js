'use strict';

/* jasmine specs for services go here */

describe('services', function() {

    describe('service: TranslatorService', function () {
        // Load your module.
        beforeEach(module('app'));

        //// Setup the mock service in an anonymous module.
        //beforeEach(module(function ($provide) {
        //    $provide.value('oneOfMyOtherServicesStub', {
        //        someVariable: 1
        //    });
        //}));

        var service = null;

        beforeEach(inject(function(TranslatorService) {
            service = TranslatorService;
        }));

        it('should be defined itself', function () {
            expect(service).toBeDefined();
        });

        it('Should define methods', function() {
            expect(service.getTranslation).toBeDefined();
            expect(service.getTranslation).toEqual(jasmine.any(Function));
        });
    });

});
