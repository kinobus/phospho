'use strict';

angular.module('phosphoApp')
  .factory('loginService', function ($rootScope, $firebaseAuth, firebaseRef, $timeout) {
    // Service logic
    // ...

    var auth = null;

    // Public API here
    return {
      init: function (path) {
        return auth = $firebaseAuth(firebaseRef(), {path: path});
      },
      login: function (callback) {
        auth.$login('twitter')
          .then(function (user) {
            callback && callback(null, user);
          }, callback);
      },
      logout: function ()  {
        auth.$logout();
      }
    };
  });
