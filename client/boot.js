import Level from "./level";
import * as Logger from "./anon/logger";

var INITIAL_STATE = {
  setup: "RUNNING"
};

var logger = window.console;
var level = Level(INITIAL_STATE);
level.logger = logger;

import Router from "./router";
var router = Router(window);
import View from "./view";
level.view = new View();
level.view.addCallback(function (projection) {
  router.state = projection;
});

function RouterController(router, app){
  router.callback = app.applyPopState;
}

var routerController = RouterController(router, level);

// This is good as the application state can exist without a router representation of it.
level.applyPopState(router.state);

import { throttle } from "./anon/function";
import * as Vector from "./vector";
function handleReading(deviceMotionEvent) {
  var acceleration = deviceMotionEvent.accelerationIncludingGravity;
  // Use to call setup complete only once
  // DEBT setup complete should be a derived property
  // build on top of view status and accelerometer status
  // this.sensorError
  var stillToSetup = true;

  try {
    acceleration = Vector.create(acceleration);
    if (navigator.userAgent.match(/Windows/i)) {
      acceleration = Vector.scale(-1, acceleration);
    } else if (navigator.userAgent.match(/Android/i)) {
      acceleration = acceleration;
    } else {
      acceleration = Vector.scale(-1, acceleration);
    }
    // TODO handle bad reading
    if (stillToSetup) {
      level.setupComplete();
    }
    level.newReading(vector);

  } catch (e) {
    level.setupFailed();
  }

}
var handleReadingThrottled = throttle(handleReading, 50);
window.addEventListener("devicemotion", handleReadingThrottled);

export default level;
import { ready } from "./anon/dom";
function loadStatusToMessage(status){
  if (status === "COMPLETED") {
    return 'Ready! Click to begin';
  }
  if (status === "FAILED") {
    return 'No Sensor Detected! Device needs accelerometer';
  }
  return 'Loading...';
}
var $root, $spiritLevel, $splashScreen, $loadStatus;
ready(function(){
  $root = document.documentElement;
  $spiritLevel = $root.querySelector("[data-display~=spirit-level]");
  $splashScreen = $root.querySelector("[data-display~=splash-screen]");
  $loadStatus = $root.querySelector("[data-display~=load-status]");
  // DEBT this hack means that a render is called after all the pieces are available.
  function domRender (projection) {
    var minimised = projection.menuVisible;
    if (minimised) {
      $spiritLevel.classList.add("minimised");
    } else {
      $spiritLevel.classList.remove("minimised");
    }
    $spiritLevel.classList.remove("apple");
    $spiritLevel.classList.remove("blueberry");
    $spiritLevel.classList.remove("cherry");
    $spiritLevel.classList.remove("peach");
    $spiritLevel.classList.add(projection.theme);
    if(projection.splashScreenAcknowledged){
      $splashScreen.classList.add("hidden");
    }
    var message = loadStatusToMessage(projection.setup);
    $loadStatus.innerHTML = message;
  }
  level.view.addCallback(domRender);
});
