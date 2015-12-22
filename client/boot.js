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

logger.log(uri.query["log-level"]);
logger.log("log");
logger.debug("debug");
logger.info("info");
logger.warn("warn");

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
