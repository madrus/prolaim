/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('prolaim.core')
        .constant('toastr', toastr)
        .constant('moment', moment);
})();
