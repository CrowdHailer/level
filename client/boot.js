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
  // TODO handle bad reading
  level.newReading(acceleration);
}
var handleReadingThrottled = throttle(handleReading, 50);
window.addEventListener("devicemotion", handleReadingThrottled);

export default level;
