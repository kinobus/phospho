'use strict';

angular.module('phosphoApp')
  .controller('MainCtrl', function ($rootScope, $scope, $filter, dashboards, $firebaseAuth, $firebase) {

    var ref = new Firebase('https://phospho.firebaseio.com/users');
    $scope.auth = $firebaseAuth(ref);

    $scope.items = $firebase(ref);

    $scope.selectedItem = null;

    //$rootScope.$on('$firebaseAuth:login', function(e, user) {
    //  $scope.authState = 'loggedIn';
    //  console.log('User ' + user.id + 'successfully logged in!');
    //});

    $scope.newFigure = {'cols':12};

    $scope.authState = 'loggedOut';

    $rootScope.$on('$firebaseAuth:logout', function(e, user) {
      $scope.authState = 'loggedOut';
      console.log('loggedOut');
    });

    $scope.dashPicker = function (dash, authState) {
      $scope.dashboard = dash;
      if (authState !== 'loggedIn') {
        $scope.authState = 'guest';
      }
    };

    $scope.logout = function () {
      $scope.auth.$logout();
    };

    $scope.login = function (source) {
      if (source === 'twitter') {
        $scope.auth.$login('twitter').then(function(user) {
          $rootScope.user = user;
          $scope.authState = 'loggedIn';
          console.log('Logged in as: ', user.uid);
        }, function(error) {
          console.error('Login failed: ', error);
        });
      } else if (source === 'guest') {
        $scope.authState = 'guest';
      }
    };

    $scope.deselect = function () {
      $scope.selectedItem = null;
    };


    $scope.dashboards = dashboards.getDashboards();

    $scope.filterGroups = [
      {
        'id':'myObjects',
        'title':'My Collection',
        'userlist': [{'user':'selfUser'}]
      },
      {
        'id':'moonlabObjects',
        'userlist': [{'group':'moonLab'}]
      }
    ];
  });
