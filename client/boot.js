import Level from "./level";
import * as Logger from "./anon/logger";

var THEME_MATCH = /theme=([^&]+)/;
var query = window.location.search.slice(1);

var theme = query.match(THEME_MATCH)[1] || "apple";

var logger = window.console;
var level = Level({setup: "RUNNING", theme: theme});
level.logger = logger;

import View from "./view";
level.view = new View();

export default level;
