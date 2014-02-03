/* global Firebase */
'use strict';

angular.module('phosphoBaseApp')
  .factory('PhosphoIO', function PhosphoIO($firebase) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var FBURL = 'https://phosphobase.firebaseio.com/';
    //var FBURL = new Firebase('https://phosphobase.firebaseio.com/');
    return {
      fbSync: function (path) {
        return $firebase(new Firebase(FBURL + path));
      }
    };
  });
