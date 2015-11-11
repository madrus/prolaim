/*jshint -W117 */
(function () {
    'use strict';

    angular.module('shell.content')
        .controller('Content', Content);

    Content.$inject = [
        '$rootScope', 'dataService', 'languageService', 'logger'
    ];
    
    ///////////////////////////////////////////////////////////////////

    function Content($rootScope, dataService, languageService, logger) {

        console.log('CONTENT: inside the controller');
    }

})();
