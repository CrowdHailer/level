/*jshint esnext: true */
"use strict";

import * as ACTIONS from "./actions";
import OrientationStore from "./orientation-store";
import SplashComponent from "./splash-component";


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
    acknowledgeSplash: function (vector) {
      store.dispatch({
        type: ACTIONS.ACKNOWLEDGE_SPLASH,
        vector: vector
      });
    },
    stores: [
      store
    ]
  };
}

var app = Actions();

var $splashComponent = window.document.querySelector("[data-component~=splash-component]");
var splashComponent = SplashComponent($splashComponent, app);

export default app;
