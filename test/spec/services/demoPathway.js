'use strict';

describe('Service: Demopathway', function () {

  // load the service's module
  beforeEach(module('phosphoElementsApp'));

  // instantiate service
  var Demopathway;
  beforeEach(inject(function (_Demopathway_) {
    Demopathway = _Demopathway_;
  }));

  it('should do something', function () {
    expect(!!Demopathway).toBe(true);
  });

});
