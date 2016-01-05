import "./polyfill";
onerror = function(e){ alert(e) }

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
    if (stillToSetup) {
      level.setupComplete();
    }
    level.newReading(acceleration);

  } catch (e) {
    level.setupFailed();
  }

}
var handleReadingThrottled = throttle(handleReading, 50);
window.addEventListener("devicemotion", handleReadingThrottled);
export default level;

// PROJECTION LOGIC
var NEUTRAL_ACCELERATION = Vector.create({x: 0, y: 0, z: 1});

function projectAcceleration(acceleration){
  // The acceleration is the 3D vector representing the current acceleration of the phone.
  // The neutral acceleration is the normalized reading if the phone was lying screen up on a level surface.

  // angle is the deviation in degrees of the current acceleration from the neutral acceleration
  var angle = Vector.angle(NEUTRAL_ACCELERATION, acceleration);
  // console.log(acceleration.toString());
  // console.log(NEUTRAL_ACCELERATION.toString());
  // console.log(angle);

  // xOffset^2 + yOffset^2 = angle^2
  // acceleration.x * f = xOffset
  // acceleration.y * f = yOffset
  // implies
  // f^2 = angle^2/(acceleration.x^2 + acceleration.x^2)
  var f;
  if (angle === 0) {
    f = 0;
  } else {
    f = Math.sqrt((angle * angle) / (acceleration.x * acceleration.x + acceleration.y * acceleration.y));
  }
  return {
    x: acceleration.x * f,
    y: acceleration.y * f
  };
}
// PRESENTATION LOGIC
function loadStatusToMessage(status){
  if (status === "COMPLETED") {
    return 'Ready! Click to begin';
  }
  if (status === "FAILED") {
    return 'No Sensor Detected! Device needs accelerometer';
  }
  return 'Loading...';
}

function formatNumber(number){
  number = number || 0;
  var string = '';
  var array = (number + '').split('.');
  var digits = array[0];
  var tmp;
  if (digits.indexOf('-') != -1){
    string += '-';
    tmp = digits.split('-')[1];
    if (tmp.length == 1){
      string += '0';
    }
    string += tmp;
  } else {
    string += '+';
    if (digits.length == 1) {
      string += '0';
    }
    string += digits;
  }
  var decimals = array[1] || '0';
  if (decimals.length == 1) {
    decimals += '0';
  }
  string = string + '.' + decimals;
  return string.slice(0, 6);
}

import { ready } from "./anon/dom";
var $root, $spiritLevel, $splashScreen, $loadStatus;
Object.defineProperty(View.prototype, "render", {
  value: function(object){
    var view = this;
    window.cancelAnimationFrame(view.requestID);
    this.requestID = window.requestAnimationFrame(function(){

      for (var display in view) {
        var value = object[display];
        if (value == void 0) { return; }
        view[display] = value;
      }
    });
  },
  enumerable: false
});

ready(function(){
  var display = new Display(document.documentElement);
  function renderDomDisplay(projection){
    var angles = {x: 0, y: 0};
    if (projection.reading) {
      angles = projectAcceleration(projection.reading);
    }
    display.splashScreenAcknowledged = projection.splashScreenAcknowledged;
    display.menuVisible = projection.menuVisible;
    display.theme = projection.theme;
    display.loadStatus = loadStatusToMessage(projection.setup);
    display.angleX = formatNumber(angles.x);
    display.angleY = formatNumber(angles.y);
  }
  var requestID;
  level.view.addCallback(function(projection){
    window.cancelAnimationFrame(requestID);
    requestID = window.requestAnimationFrame(function(){
      renderDomDisplay(projection);
    });
  });
});
window.Vector = Vector;
function Display($root){
  var $bubble = $root.querySelector("[data-display~=bubble]");
  var $angleX = $root.querySelector("[data-display~=angleX]");
  var $angleY = $root.querySelector("[data-display~=angleY]");
  var $spiritLevel = $root.querySelector("[data-display~=spirit-level]");
  var $splashScreen = $root.querySelector("[data-display~=splash-screen]");
  var $loadStatus = $root.querySelector("[data-display~=load-status]");

  $splashScreen.addEventListener("click", function(){
    // DEBT needed for safari
    window.level.acknowledgeSplashScreen();
  });

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
setTimeout(function () {
  level.acknowledgeSplashScreen()
}, 2000);
