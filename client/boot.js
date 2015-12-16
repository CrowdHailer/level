/* jshint esnext: true */
'use strict';

import App from "./app";
import Component from "./component";
import Router from "./router";

var app = new App();
var router = new Router(app);
var component = new Component(document, app);

export default app;

function handleReading(deviceMotionEvent) {
  var acceleration = deviceMotionEvent.accelerationIncludingGravity;
  // DEBT rectify for browsers here
  app.accelerationReading(acceleration);
}
window.addEventListener("devicemotion", handleReading);
