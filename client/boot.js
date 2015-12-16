/* jshint esnext: true */
'use strict';

import Map from "carbide/map";
import View from "./view";

import State from "./state";

import * as Dispatcher from "anon/dispatcher";
function App(){
  var dispatcher = Dispatcher.create(window.console);
  var state = State.create(window.location);

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



import Controller from "./controller";
import Location from "./location";

var app = new App();
var myLocation = new Location(app);
var controller = Controller(document, app);

// Humble view
function Component($root, app){
  function wrap(state){
    return {
      angleX: (state.accelerationReading.x || 0).toFixed(2),
      angleY: (state.accelerationReading.y || 0).toFixed(2),
      theme: state.theme,
      menuActive: state.menuActive
    };
  }
  var view = new View($root);

  function update(){
    var presentation = wrap(app.state);
    view.render(presentation);
  }

  this.update = update;
  update();
  app.onUpdate(update);
}
var component = new Component(document, app);
export default app;

function handleReading(deviceMotionEvent) {
  var acceleration = deviceMotionEvent.accelerationIncludingGravity;
  // DEBT rectify for browsers here
  app.accelerationReading(acceleration);
}
window.addEventListener("devicemotion", handleReading);
