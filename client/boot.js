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
    if (state.menuOpen) { return; }
    state = State.openMenu(state);
    dispatcher.dispatch();
  };
  this.closeMenu = function(){
    if (!state.menuOpen) { return; }
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
    state = State.accelerationReading(state, reading);
    dispatcher.dispatch();
  };
}

import * as QString from "query-string";
function Location(app){
  function url(projection){
    var path = "/";
    if (projection.menuOpen) {
      path = path + "menu";
    }

    var query = {theme: projection.theme.toLowerCase()};
    var queryString = QString.stringify(query);

    return path + "?" + queryString;
  }


  history.replaceState({}, "", url(app.state));
  function update(){
    history.pushState({}, "", url(app.state));
  }
  this.update = update;
}

import Controller from "./controller";

var app = new App();
var controller = Controller(document, app);
var $view = new View(document);
$view.isSpiritLevelMinimised = app.state.menuOpen;
$view.theme = app.state.theme;
var myLocation = new Location(app);
app.onUpdate(myLocation.update);
myLocation.update();
app.onUpdate(function(){
  $view.isSpiritLevelMinimised = app.state.menuOpen;
  $view.theme = app.state.theme;
  console.log(app.state.accelerometerReading.x)
  $view.angleX = app.state.accelerometerReading.x.toFixed(2) || "0";
});
export default app;

window.addEventListener("devicemotion", function (deviceMotionEvent) {
  var acceleration = deviceMotionEvent.accelerationIncludingGravity;
  // DEBT rectify for browsers here
  app.accelerationReading(acceleration);
});
