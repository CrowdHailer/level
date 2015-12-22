/* jshint esnext: true */
'use strict';

import App from "./app";
import Component from "./component";
import Router from "./router";
import * as URI from "./uri";
console.log("hello");
var uri = URI.parseLocation(window.location);

import Struct from "./node_modules/carbide/struct";
import * as Vector from "./vector";

var state = new Struct({
  theme: uri.query.theme || "apple",
  menuActive: uri.path[0] === ["menu"],
  acceleration: Vector.create({x: 0, y: 0, z: 0})
});
console.log(state);
// start by parsing url
// app state has theme, log-level, acceleration, menu-active

var app = new App({state: state});
var router = new Router(app);
var component = new Component(document, app);

export default app;

function handleReading(deviceMotionEvent) {
  var acceleration = deviceMotionEvent.accelerationIncludingGravity;
  // DEBT rectify for browsers here
  app.accelerationReading(acceleration);
}
window.addEventListener("devicemotion", handleReading);
