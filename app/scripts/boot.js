/*jshint esnext: true */
"use strict";

var ACTIONS = {
  ACCELEROMETER_READING: "ACCELEROMETER_READING"
};
function Store(argument) {
  var neutral = {x: 0, y: 0, z: 0};
  var down = {x: 0, y: 0, z: 0};

  return Object.create({
    dispatch: function dispatch(action) {
      switch (action.type) {
        case ACTIONS.ACCELEROMETER_READING:
            window.console.log("update down");
            window.console.log(action.vector);

          break;
        default:

      }
    }
  }, {
    x: {
      get: function () {
        return down.x;
      }
    }
  });
}

var store = Store();

function Actions() {
  window.console.log("Booting....");
  return {
    accelerometerReading: function (vector) {
      store.dispatch({
        type: ACTIONS.ACCELEROMETER_READING,
        vector: vector
      });
    }
  };
}

var app = Actions();

export default app;
