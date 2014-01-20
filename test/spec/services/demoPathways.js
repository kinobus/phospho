'use strict';

describe('Service: Demopathways', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Demopathways;
  beforeEach(inject(function (_Demopathways_) {
    Demopathways = _Demopathways_;
  }));

  it('should do something', function () {
    expect(!!Demopathways).toBe(true);
  });

});
