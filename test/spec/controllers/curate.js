'use strict';

describe('Controller: CurateCtrl', function () {

  // load the controller's module
  beforeEach(module('phosphoApp'));

  var CurateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CurateCtrl = $controller('CurateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
