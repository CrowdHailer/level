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
// instead when registering router controller as listener to router it gets state and calls app with it.
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
  var display = new Display(document.documentElement);
  level.view.addCallback(function(projection){
    display.splashScreenAcknowledged = projection.splashScreenAcknowledged;
    display.menuVisible = projection.menuVisible;
    display.theme = projection.theme;
    display.loadStatus = loadStatusToMessage(projection.setup);
  });
});

function Display($root){
  var $bubble = $root.querySelector("[data-display~=bubble]");
  var $angleX = $root.querySelector("[data-display~=angleX]");
  var $angleY = $root.querySelector("[data-display~=angleY]");
  var $spiritLevel = $root.querySelector("[data-display~=spirit-level]");
  var $splashScreen = $root.querySelector("[data-display~=splash-screen]");
  var $loadStatus = $root.querySelector("[data-display~=load-status]");

  Object.defineProperty(this, 'splashScreenAcknowledged', {
    set: function(toggle){
      if (toggle) {
        $splashScreen.classList.add("hidden");
      }
    }
  });
  Object.defineProperty(this, 'loadStatus', {
    set: function(message){
      // DEBT error on bad value
      $loadStatus.innerHTML = message;
    }
  });
  Object.defineProperty(this, "menuVisible", {
    set: function(minimised){
      if (typeof minimised !== 'boolean') {
        throw new TypeError("menuVisible property should be a boolean");
      }

      if (minimised) {
        $spiritLevel.classList.add("minimised");
      } else {
        $spiritLevel.classList.remove("minimised");
      }
    },
    enumerable: true
  });
  Object.defineProperty(this, "angleX", {
    set: function(angle){
      if (typeof angle !== 'string') {
        throw new TypeError("angleX property should be a string");
      }

      $bubble.setAttribute("cx", angle);
      $angleX.innerHTML = angle;
    },
    enumerable: true
  });
  Object.defineProperty(this, "angleY", {
    set: function(angle){
      if (typeof angle !== 'string') {
        throw new TypeError("angleY property should be a string");
      }

      $bubble.setAttribute("cy", angle);
      $angleY.innerHTML = angle;
    },
    enumerable: true
  });
  Object.defineProperty(this, "theme", {
    set: function(theme){
      if (typeof theme !== 'string') {
        throw new TypeError("theme property should be a string");
      }

      $spiritLevel.classList.remove("apple");
      $spiritLevel.classList.remove("blueberry");
      $spiritLevel.classList.remove("cherry");
      $spiritLevel.classList.remove("peach");
      $spiritLevel.classList.add(theme);
    },
    enumerable: true
  });
}
