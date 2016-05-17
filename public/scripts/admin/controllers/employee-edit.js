'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:EmployeeEditCtrl
 * @description
 * # EmployeeEditCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('EmployeeEditCtrl', function ($scope, $location, Restangular, employee) {
  var original = employee;
  $scope.employee = Restangular.copy(original);
  

  $scope.isClean = function() {
    return angular.equals(original, $scope.employee);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/employee";
      } else {
        $location.path('/crud/employee');
      }
    });
  };

  $scope.save = function() {
    $scope.employee.put().then(function() {
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/employee";
      } else {
        $location.path('/crud/employee');
      }
    });
  };
});
