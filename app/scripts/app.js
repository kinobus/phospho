'use strict';

angular.module('phosphoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  '$strap.directives'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/share', {
        templateUrl: 'views/share.html',
        controller: 'ShareCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
