'use strict';

describe('Service: Firebaseref', function () {

  // load the service's module
  beforeEach(module('phosphoApp'));

  // instantiate service
  var Firebaseref;
  beforeEach(inject(function (_Firebaseref_) {
    Firebaseref = _Firebaseref_;
  }));

  it('should do something', function () {
    expect(!!Firebaseref).toBe(true);
  });

});
