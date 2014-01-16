'use strict';

angular.module('phosphoApp')
  .controller('MainCtrl', function ($scope, dashboards, figures, userFactory, $firebase, FBURL, $firebaseSimpleLogin) {

    //get dashboards
    $scope.dashboards = dashboards;

    //get figure types from figures 
    $scope.figureModels = figures;

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

      }, function(error) {
        console.error('Login failed: ', error);
      });
    };

    $scope.initLogin = function () {
      //login as an anonymous user
      //TODO override this if already signed in
      $scope.login('anonymous');

      //make an account
      //TODO override this if already have an account (check in $scope.users)
      //$scope.user = $scope.users.$child(user.uid);
      //$scope.user.userid = user.id;
    };

    //log in right away
    $scope.initLogin();

    //Get kinase-substrate interactome titles from firebase
    $scope.ksIntTitles = $scope.fb('/interactomes/titles');

    //Get cell signaling pathway titles from firebase
    $scope.pathwayTitles = $scope.fb('/pathways/titles');

    //function to get pathway
    $scope.getPathway = function (title) {
      $scope.pathway = $scope.fb('/pathways/' + title);
    };

    //Get cell signaling pathway template titles from firebase
    $scope.pathwayTemplateTitles = $scope.fb('/pathwayTemplates/titles');

    //function to get pathwayTemplate
    $scope.getPathwayTemplate = function (title) {
      $scope.pathwayTemplate = $scope.fb('/pathwayTemplates/' + title);
    };

  });
