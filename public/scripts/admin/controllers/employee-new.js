'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:EmployeeNewCtrl
 * @description
 * # EmployeeNewCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('EmployeeNewCtrl', function ($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('employees').post($scope.employee).then(function(employee) {  
      if(navigator.userAgent.match(/Zombie/)) {
          document.location.hash = "#/crud/employee";
      } else {
        $location.path('/crud/employee');
      }
    });
  }
});
