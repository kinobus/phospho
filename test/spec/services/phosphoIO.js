'use strict';

describe('Service: Phosphoio', function () {

  // load the service's module
  beforeEach(module('phosphoBaseApp'));

  // instantiate service
  var Phosphoio;
  beforeEach(inject(function (_Phosphoio_) {
    Phosphoio = _Phosphoio_;
  }));

  it('should do something', function () {
    expect(!!Phosphoio).toBe(true);
  });

});
