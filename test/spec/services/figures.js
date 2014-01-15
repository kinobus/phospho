'use strict';

describe('Service: Figure', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Figure;
  beforeEach(inject(function (_Figure_) {
    Figure = _Figure_;
  }));

  it('should do something', function () {
    expect(!!Figure).toBe(true);
  });

});
