'use strict';

angular.module('phosphoApp')
  .factory('userFactory', function () {
    // Service logic
    // ...

    var userModel = {
      'user':[
        'id',
        'username',
        'picUrl'
      ],
      'profile':[
        'bio',
        'groupMemberships',
        'notifications',
        'interests'
      ]
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
