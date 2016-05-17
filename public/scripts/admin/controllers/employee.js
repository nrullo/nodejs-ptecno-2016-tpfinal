'use strict';

/**
 * @ngdoc function
 * @name anyandgoApp.controller:EmployeeCtrl
 * @description
 * # EmployeeCtrl
 * Controller of the anyandgoApp
 */
angular.module('anyandgoApp')
  .controller('EmployeeCtrl', function ($scope, Restangular) {
   $scope.employees = Restangular.all("employees").getList().$object;
  });
