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
        authRequired: true,
        templateUrl: 'views/share.html',
        controller: 'ShareCtrl'
      })
      .when('/feed', {
        templateUrl: 'views/feed.html',
        controller: 'FeedCtrl'
      })
      .when('/curate', {
        authRequired: true,
        templateUrl: 'views/curate.html',
        controller: 'CurateCtrl'
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


