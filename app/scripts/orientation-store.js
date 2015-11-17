/*jshint esnext: true */
"use strict";

import * as ACTIONS from "./actions";
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
    },
    // DEBT dispatch method here is untested. It should move up to a store prototype
    dispatch: function dispatch(action) {
      switch (action.type) {
        case ACTIONS.ACCELEROMETER_READING:
          this.accelerometerReading(action.vector);

          break;
        default:

      }
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
