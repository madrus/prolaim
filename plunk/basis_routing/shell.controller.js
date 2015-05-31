(function() {
  var ShellController = function() {
    console.log("Inside ShellController");
  };

  var module = angular.module('app.shell', []);
  module.controller('ShellController', ShellController);

})();