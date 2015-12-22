/* jshint esnext: true */
'use strict';

import App from "./app";
import Component from "./component";
import Router from "./router";
import * as URI from "./uri";
import Struct from "./node_modules/carbide/struct";
import * as Vector from "./vector";

import { development, wrap, LOG_LEVELS } from "./node_modules/anon/logger";

var uri = URI.parseLocation(window.location);
var logLevel = uri.query["log-level"];
if (LOG_LEVELS[logLevel] == void 0) {
  logLevel = "warn"; // Production log level
}

var state = new Struct({
  theme: uri.query.theme || "apple",
  menuActive: uri.path[0] === ["menu"],
  acceleration: Vector.create({x: 0, y: 0, z: 0}),
  logLevel: logLevel
});

var logger = wrap(development, {prefix: "LEVEL", logLevel: state.logLevel});

var app = new App({state: state, logger: logger});
var router = new Router(app);
var component = new Component(document, app);

export default app;

import { throttle } from "./node_modules/anon/function";
function handleReading(deviceMotionEvent) {
  var acceleration = deviceMotionEvent.accelerationIncludingGravity;

  if (navigator.userAgent.match(/Windows/i)) {
      acceleration = {
          x: -1 * acceleration.x,
          y: -1 * acceleration.y,
          z: -1 * acceleration.z
      };
  } else if (navigator.userAgent.match(/Android/i)) {
      acceleration = acceleration;
  } else {
      acceleration = {
          x: -1 * acceleration.x,
          y: -1 * acceleration.y,
          z: -1 * acceleration.z
      };
  }
  app.accelerationReading(acceleration);
}
var handleReadingThrottled = throttle(handleReading, 100);
window.addEventListener("devicemotion", handleReadingThrottled);
