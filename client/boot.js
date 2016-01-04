import Level from "./level";
import * as Logger from "./anon/logger";

var INITIAL_STATE = {
  setup: "RUNNING"
};

var logger = window.console;
var level = Level(INITIAL_STATE);
level.logger = logger;

import View from "./view";
level.view = new View();

function stateFromLocation(location){
  var THEME_MATCH = /theme=([^&]+)/;
  var query = location.search.slice(1);

  var theme = (query.match(THEME_MATCH) || [])[1] || "apple";

  var menuVisible = location.pathname === "/menu";
  return {theme: theme, menuVisible: menuVisible};
}

window.onpopstate = function(){
  var state = stateFromLocation(window.location);
  level.applyPopState(state);
};

level.applyPopState(stateFromLocation(window.location));

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

ready(function(){
  setTimeout(function () {
    level.view.render(level.view.projection);
  }, 10);
});
