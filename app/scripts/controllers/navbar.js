/* global Firebase */
'use strict';

angular.module('phosphoBaseApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $firebaseSimpleLogin, $modal) {

    // Set up firebase simple login object
    // TODO: move this to PhosphoIO service
    $rootScope.auth = {'newAccount': false};

    var ref = new Firebase('https://phosphobase.firebaseio.com');
    var loginObj = $firebaseSimpleLogin(ref);


    // Handle Logging in and out by placing an object the root scope
    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
      $rootScope.auth.user = user;
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      $rootScope.auth.user = null;
    });

    // Set initial login palceholder for test user
    $rootScope.auth.email = 'test@phospho.io';
    $rootScope.auth.password = 'test123';

    $rootScope.loginModal = function () {
      $scope.modalInstance = $modal.open({
        templateUrl: 'views/login-modal.html'
      });
    };

    $rootScope.fbLogin = function () {
      loginObj.$login('password', {
        'email': $rootScope.auth.email,
        'password': $rootScope.auth.password
      });
      $scope.modalInstance.close();
    };

    $rootScope.signup = function () {

      loginObj
        .$createUser($rootScope.auth.email, $rootScope.auth.password)
        .then(function (user) {
          console.log('Created account and logged in as: ', user.uid);
        }, function (error) {
          console.log('login failed: ', error);
        });

    };

    // $rootScope.profileModal = function () {
    //   $modal.open({
    //     templateUrl: 'views/profile-modal.html'
    //   });
    // };

    $rootScope.logout = function () {
      loginObj.$logout();
    };

    $scope.authDropdown = {
      'choices': [
        {'text': 'View/Edit Profile', 'action': 'viewProfile'},
        {'text': 'Log Out', 'action': 'logout'}
      ]
    };

    $scope.authDropdown.select = function (action) {
      if (action === 'viewProfile') {
        $modal.open({
          templateUrl: 'views/profile-modal.html'
        });
      } else if (action === 'logout') {
        loginObj.$logout();
      }
    };
  });
