'use strict';

describe('Service: Allkinases', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Allkinases;
  beforeEach(inject(function (_Allkinases_) {
    Allkinases = _Allkinases_;
  }));

  it('should do something', function () {
    expect(!!Allkinases).toBe(true);
  });

});
