/*jshint jasmine: true, esnext: true */
"use strict";

import Store from "../app/scripts/orientation-store";

describe("Orientation Store", function() {

  it("it should start off with angleX = 0", function() {
    // Probably going to view model this to be "0.00"
    var store = Store();
    expect(store.angleX).toEqual(0);
  });

  it("it should start off with angleY = 0", function() {
    // Probably going to view model this to be "0.00"
    var store = Store();
    expect(store.angleY).toEqual(0);
  });

  it("it should calculate angleX for shift", function () {
    var store = Store();
    var vector = {x: 1, y: 0, z: 1};
    store.accelerometerReading(vector);
    expect(store.angleX).toEqual(45);
  });

  it("it should calculate angleY for shift", function () {
    var store = Store();
    var vector = {x: 0, y: 1, z: 1};
    store.accelerometerReading(vector);
    expect(store.angleY).toEqual(45);
  });

});
