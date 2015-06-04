'use strict';

/* jasmine specs for controllers go here */
describe('Prolaim controllers', function () {
    describe('ShellController as vm', function () {

        var $provide;
        var myTranslatorService;
        var scope = {
            vm: {}
        };
        var ShellController;

        beforeEach(function () {
            // load your controllers including myController
            module('app');
            module('app.shell');

            // load your services (do not forget to include them in your spec runner !)
            // there should be myService defined in this module
            module('TranslatorService');

            module(function (_$provide_) {
                $provide = _$provide_;
                $provide.service('TranslatorService', myTranslatorService);
            });

            inject(function ($injector) {
                myTranslatorService = $injector.get('TranslatorService');
            });


            inject(function (TranslatorService, $controller, $rootScope) {

                var scope = $rootScope.$new();
                scope.vm = {};

                ShellController = $controller('ShellController', {
                    myTranslatorService: TranslatorService,
                    $scope: scope
                });

                //it('should make sure the language is "ru"', inject(function($controller) {
                //  var scope = {},
                //      ctrl = $controller('ShellController', {$scope:scope});
                //
                //  expect(scope.phones.length).toBe(3);
                //}));
            })
        });

        it('should pass the dummy test', function () {
            expect(true).toBe(true);
        });

        it('should be defined', function () {

            //verify that the controller is there
            expect(ShellController).toBeDefined();
        });

        it('should publish controller instance into scope', function () {
            $controllerProvider.register('ShellController', function () {
                this.mark = 'vm';
            });

            var vm = $controller('ShellController as vm', {$scope: scope});
            expect(scope.vm).toBe(vm);
            expect(scope.vm.mark).toBe('vm');
        });

        it('should show that the default language is \'ru\'', function () {
            expect(scope.vm.language).toBe('ru');
        });
    });
});
