'use strict';

angular.module('phosphoApp')
  .controller('MainCtrl', function ($scope, dashboards, figures, userFactory, $firebase, FBURL, $firebaseSimpleLogin) {

    //get dashboards
    $scope.dashboards = dashboards;

    $scope.setDash = function (dash) {
      $scope.dashboard = dash
    };

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

    //Get kinase-substrate interactome titles from firebase
    $scope.ksIntTitles = $scope.fb('/interactomes/titles');

    //Get cell signaling pathway titles from firebase
    $scope.pathwayTitles = $scope.fb('/pathways/titles');

    //function to get pathway
    $scope.getPathway = function (title) {
      $scope.pathway = $scope.user.collection.pathways.pathways[title];
      //$scope.pathway = $scope.fb('/pathways/' + title);
    };

    //Get cell signaling pathway template titles from firebase
    $scope.pathwayTemplateTitles = $scope.fb('/pathwayTemplates/titles');

    //function to get pathwayTemplate
    $scope.getPathwayTemplate = function (title) {
      $scope.pathwayTemplate = $scope.fb('/pathwayTemplates/' + title);
    };

  });
