(function () {
    'use strict';

    angular
        .module('prolaim.core', [
            /* Cross-app modules */
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            /* 3rd-party modules */
            'ui.router',
            'ngResource'
        ]);

})();
