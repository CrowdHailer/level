/*jshint jasmine: true, esnext: true */
"use strict";

function Store(argument) {
  var accelerometerReading;

  return Object.create({
    accelerometerReading: function (reading) {
      accelerometerReading = reading;
    }
  }, {
    angleX: {
      get: function () {
        return 0;
      }
    },
    angleY: {
      get: function () {
        return 0;
      }
    }
  });
}

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

  xit("it should calculate angleX for shift", function () {
    var store = Store();
    var vector = {x: 1, y: 0, z: 1};
    store.accelerometerReading(vector);
    expect(store.angleX).toEqual(45);
  });

});
