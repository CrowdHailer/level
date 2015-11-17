/*jshint esnext: true */
"use strict";

import * as ACTIONS from "./actions";
import OrientationStore from "./orientation-store";
import SplashComponent from "./splash-component";

var store = OrientationStore();

function SplashStore() {
  return Object.create({
    dispatch: function () {
      console.log("splash store dispatching");
    }
  });
}
var splashStore = SplashStore();

var DispatcherPrototype = {
  dispatch: function (action) {
    this.stores.forEach(function (store) {
      store.dispatch(action);
    });
  }
};
function Dispatcher(stores) {
  return Object.create(DispatcherPrototype, {
    stores: {
      get: function () { return stores; }
    }
  });
}

var dispatcher = Dispatcher([store, splashStore]);

function Actions(dispatcher) {
  window.console.log("Booting....");
  return {
    accelerometerReading: function (vector) {
      dispatcher.dispatch({
        type: ACTIONS.ACCELEROMETER_READING,
        vector: vector
      });
    },
    acknowledgeSplash: function (vector) {
      dispatcher.dispatch({
        type: ACTIONS.ACKNOWLEDGE_SPLASH,
        vector: vector
      });
    }
  };
}

var app = Actions(dispatcher);

var $splashComponent = window.document.querySelector("[data-component~=splash-component]");
var splashComponent = SplashComponent($splashComponent, app);

export default app;
