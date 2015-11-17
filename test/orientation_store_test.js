/*jshint jasmine: true, esnext: true */
"use strict";


describe("Orientation Store", function() {

  it("it should start off with angleX = 0", function() {
    // Probably going to view model this to be "0.00"
    var store = {angleX: 0};
    expect(store.angleX).toEqual(0);
  });

  it("it should start off with angleY = 0", function() {
    // Probably going to view model this to be "0.00"
    var store = {angleY: 0};
    expect(store.angleY).toEqual(0);
  });

});
