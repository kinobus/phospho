'use strict';

angular.module('phosphoApp')
  .factory('userFactory', function (demoData) {
    // Service logic
    // ...
    //These values should be passed to userFactory from a method invoked after a succesful firebase login
    //The input arguments will be passed from the $scope.auth.user (initialized by firebaseAuth)

    var userModel = {
      'user': 'guest',
      'collection': {
        'datasets': demoData
      }
    };

    var groupModel = {
      'group':[
        'groupname',
        'institution',
        'bio',
        'memberList',
        'leaderList',
        'interests'
      ]
    };

    // Public API here
    return {
      makeUser: function () {
        return userModel;
      },
      makeGroup: function () {
        return groupModel;
      }
    };
  });
