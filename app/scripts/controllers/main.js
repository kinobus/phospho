'use strict';

angular.module('phosphoApp')
  .controller('MainCtrl', function ($rootScope, $scope, $filter, dashboards, figures, userFactory, $firebaseAuth, $firebase) {

    //get figure types from figures and initiailize figureType model 
    $scope.figureModels = figures;
    $scope.figureType = $scope.figureModels[0];

    //get dashboards
    $scope.dashboards = dashboards;

    //Login Stuff --

    //TODO follow angularfire seed example to move firebase into service
    var userRef = new Firebase('https://phospho.firebaseio.com/users');

    $scope.auth = $firebaseAuth(userRef);

    $scope.initLogin = function (user) {
      if (!user) {
        console.log('sup');
        $scope.login('guest');
      }
    };

    $scope.user = userFactory.makeUser();

    $rootScope.$on('$firebaseAuth:logout', function() {
      console.log('loggedOut');
    });

    $rootScope.$on('$firebaseAuth:login', function(e, user) {
      console.log('User ' + user.id + ' successfully logged in!');
      $scope.users = $firebase(userRef);
      
      //create a profile (will be denied by firebase if user already exists)
      $scope.user = $scope.users.$child(user.uid);
      $scope.user.userid = user.id;

      //set username
      if (user.username) {
        $scope.user.username = user.username;
      } else {
        var rando = Math.floor((Math.random()*9999)+1);
        $scope.user.username = 'guest' + rando;
      }

      //save object
      $scope.user.$save();
    });

    $scope.logout = function () {
      $scope.auth.$logout();
    };

    $scope.login = function (source) {
      if (source === 'twitter') {
        $scope.auth.$login('twitter').then(function(user) {
          //$rootScope.user = user;
          console.log('Logged in as: ', user.uid);
        }, function(error) {
          console.error('Login failed: ', error);
        });
      } else if (source === 'guest') {
        $scope.auth.$login('anonymous').then(function(user) {
          console.log('Logged in as: ', user.uid);
        }, function(error) {
          console.error('Login failed: ', error);
        });
      }
    };
    //-- end login stuff

  });
