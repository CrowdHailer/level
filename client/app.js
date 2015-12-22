/* jshint esnext: true */
"use strict";

import * as State from "./state";
import * as Dispatcher from "anon/dispatcher";
export default function App(setup){
  var dispatcher = Dispatcher.create(window.console);
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
    var state1 = state;
    state = State.accelerationReading(state, reading);
    dispatcher.dispatch();
  };
}
