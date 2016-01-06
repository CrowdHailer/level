/* jshint esnext: true */
"use strict";

import * as State from "./state";
import * as Dispatcher from "anon/dispatcher";
import * as Vector from "./vector";

export default function App(setup){
  var dispatcher = Dispatcher.create(setup.logger);
  var state = setup.state;

  Object.defineProperty(this, "state", {
    get: function(){
      return state;
    }
  });

  this.onUpdate = function(cb){
    dispatcher = dispatcher.register(cb);
  };
  this.openMenu = function(){
    if (state.menuActive) { return; }
    state = State.openMenu(state);
    dispatcher.dispatch();
  };
  this.closeMenu = function(){
    if (!state.menuActive) { return; }
    state = State.closeMenu(state);
    dispatcher.dispatch();
  };
  this.selectTheme = function(theme){
    // TODO raise error for unknown theme;
    if (state.theme === theme) { return; }

    state = state.set("theme", theme);

    dispatcher.dispatch();
  };
  this.accelerationReading = function(reading){
    if (reading.x == void 0) {
      return;
    }
    // DEBT inplace because a device motion event has no keys that are enumerable
    reading = {x: reading.x, y: reading.y, z: reading.z};
    var vector = Vector.create(reading);
    state = State.accelerationReading(state, vector);
    dispatcher.dispatch(reading);
  };
}
