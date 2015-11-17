/*jshint esnext: true */
"use strict";

import * as ACTIONS from "./actions";
import OrientationStore from "./orientation-store";

var store = OrientationStore();

function Actions() {
  window.console.log("Booting....");
  return {
    accelerometerReading: function (vector) {
      store.dispatch({
        type: ACTIONS.ACCELEROMETER_READING,
        vector: vector
      });
    },
    stores: [
      store
    ]
  };
}

var app = Actions();

export default app;
