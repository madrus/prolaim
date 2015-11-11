/*jshint -W117 */
(function () {
    'use strict';

    angular.module('shell.sidebar')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = [
        '$rootScope', 'dataService', 'languageService', 'logger'
    ];
    
    ///////////////////////////////////////////////////////////////////

    function Sidebar($rootScope, dataService, languageService, logger) {

        console.log('SIDEBAR: inside the controller');
    }

})();
