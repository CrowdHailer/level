/*jshint esnext: true */
"use strict";

import * as ACTIONS from "./actions";
import OrientationStore from "./orientation-store";
import SplashComponent from "./splash-component";

var store = OrientationStore();

function SplashStore() {
  var element;
  var ready = false;
  var acknowledged = false;

  return Object.create({
    dispatch: function (action) {
      switch (action.type) {
        case ACTIONS.ACCELEROMETER_ONLINE:
        this.accelerometerOnline();

        break;

        case ACTIONS.ACKNOWLEDGE_SPLASH:
        this.acknowledgeSplash();

        break;

        default:
      }
    },
    accelerometerOnline: function () {
      if (!ready) {
        element.update({ready: true});
        ready = true;
      }
    },
    acknowledgeSplash: function () {
      if (!acknowledged) {
        element.update({acknowledged: true});
        acknowledged = true;
      }
    },
    register: function (e) {
      element = e;
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
      });
    },
    accelerometerOnline: function () {
      dispatcher.dispatch({
        type: ACTIONS.ACCELEROMETER_ONLINE,
      });
    }
  };
}

var app = Actions(dispatcher);

var $splashComponent = window.document.querySelector("[data-component~=splash-component]");
var splashComponent = SplashComponent($splashComponent, app);
splashStore.register(splashComponent);

export default app;
