'use strict';

describe('Controller: FiguremodalCtrl', function () {

  // load the controller's module
  beforeEach(module('phosphoBaseApp'));

  var FiguremodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FiguremodalCtrl = $controller('FiguremodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
