/*jshint esnext: true */
"use strict";

import Vector from "./vector";

export default function OrientationStore(argument) {
  var accelerometerReading = Vector({x: 0, y: 0, z: 1});
  var neutralAcceleration = Vector({x: 0, y: 0, z: 1});

  function angleFromNeutral() {
    return parseFloat((Math.acos(Vector.dotProduct(Vector.normalize(accelerometerReading), neutralAcceleration)) * 180/ Math.PI).toPrecision(6));
  }

  return Object.create({
    accelerometerReading: function (reading) {
      accelerometerReading = reading;
    }
  }, {
    angleX: {
      get: function () {
        return angleFromNeutral();
      }
    },
    angleY: {
      get: function () {
        return angleFromNeutral();
      }
    }
  });
}
