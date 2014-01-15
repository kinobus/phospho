'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('phosphoApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  //tests start here
  it('should start with a null value for selectedItem', function () {
    expect(scope.selectedItem).toBe(null);
  });
});
