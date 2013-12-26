'use strict';

angular.module('phosphoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
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
  })
   // establish authentication
  .run(function (loginService, $rootScope) {
     $rootScope.auth = loginService.init('/');
     $rootScope.FBURL = 'https://phospho.firebaseio.com';
  });


