'use strict';

angular.module('phosphoApp')
  .factory('firebaseRef', function (Firebase, FBURL) {
    // Service logic
    // ...

    /**
    * @function
    * @name firebaseRef
    * @param {String|Array...} path
    * @return a Firebase instance
    */
    function pathRef (args) {
      for(var i=0; i < args.length; i++) {
         if( typeof(args[i]) === 'object' ) {
            args[i] = pathRef(args[i]);
         }
      }
      return args.join('/');
    }

    // Public API here
    return function (path) {
        return new Firebase(pathRef([FBURL].concat(Array.prototype.slice.call(arguments))));
    }
  });
