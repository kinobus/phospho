/* global Firebase */
'use strict';

angular.module('phosphoBaseApp')
  .controller('LoginCtrl', function ($scope, $firebaseSimpleLogin, $rootScope) {
    
    // Set up firebase simple login object
    var dataRef = new Firebase('https://phosphobase.firebaseio.com');
    $scope.loginObj = $firebaseSimpleLogin(dataRef);


    // Handle Logging in and out by placing an object the root scope
    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
      $rootScope.user = {'email': user.email};
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      $rootScope.user = null;
    });

    // Set initial login palceholder for test user
    $scope.loginEmail = 'test@phospho.io';
    $scope.loginPassword = 'test123';


    $scope.login = function () {
      var options = {
        'email': $scope.loginEmail,
        'password': $scope.loginPassword
      };

      $scope.loginObj
        .$login('password', options)
        .then(function (user) {
          console.log('logged in as: ', user.uid);
        }, function (error) {
          console.log('login failed: ', error);
        });
    };

    $scope.signup = function () {

      $scope.loginObj
        .$createUser($scope.signupEmail, $scope.signupPassword)
        .then(function (user) {
          console.log('Created account and logged in as: ', user.uid);
        }, function (error) {
          console.log('login failed: ', error);
        });

    };

    $scope.logout = function () {
      $scope.loginObj.$logout();
    };
  });
