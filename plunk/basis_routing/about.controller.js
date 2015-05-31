(function() {
  var AboutController = function() {
    console.log("Inside AboutController");
  };

  var module = angular.module('app.about', []);
  module.controller('AboutController', AboutController);

})();