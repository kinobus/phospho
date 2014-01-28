/* global Firebase */
'use strict';

angular.module('phosphoBaseApp')
  .service('PhosphoIO', function PhosphoIO($firebase) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var ref = new Firebase('https://phosphobase.firebaseio.com/figures');
    return $firebase(ref);
  });
