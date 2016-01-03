import Level from "./level";
import * as Logger from "./anon/logger";

function stateFromLocation(location){
  var THEME_MATCH = /theme=([^&]+)/;
  var query = window.location.search.slice(1);

  var theme = query.match(THEME_MATCH)[1] || "apple";
  return {theme: theme};
}
var INITIAL_STATE = {
  setup: "RUNNING"
};

var logger = window.console;
var level = Level(Object.assign({}, INITIAL_STATE, stateFromLocation(window.location)));
level.logger = logger;

import View from "./view";
level.view = new View();

window.onpopstate = function(){
  var state = stateFromLocation(window.location);
  level.applyPopState(state);
};

export default level;
