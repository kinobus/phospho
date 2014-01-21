/* global Firebase */
'use strict';

angular.module('phosphoApp')
  .controller('MainCtrl', function ($scope, dashboards, userFactory, $firebase, FBURL, $firebaseSimpleLogin) {

    //get dashboards
    $scope.dashboards = dashboards;

    $scope.setDash = function (dash) {
      $scope.dashboard = dash;
    };

    //set scope to first dashboard immediately
    $scope.setDash($scope.dashboards[0]);

    //initialize user
    $scope.user = userFactory.makeUser();

    //FIREBASE STUFF BELOW, TODO: move it all somewhere else

    //function to get data from firebase
    $scope.fb = function (dir) {
      var ref = new Firebase(FBURL + dir);
      return $firebase(ref);
    };

    //** Login Stuff **
    $scope.login = function (provider) {
      //log in via simpleLogin with specified provider
      var ref = new Firebase(FBURL);
      $scope.loginObj = $firebaseSimpleLogin(ref);
      $scope.loginObj.$login(provider).then(function (user) {

        //succesful login
        console.log('Logged in as: ', user.uid);

        //add firebase's simpleLoginObj userId to current user
        $scope.user.userid = $scope.loginObj.user.id;

        //make an account
        //$scope.fbUsers = $scope.fb('/users');
        //$scope.fbUsers.$add($scope.user);

      }, function(error) {
        console.error('Login failed: ', error);
      });
    };

    //log in right away as anonymous
    $scope.login('anonymous');

  });
