import Level from "./level";
import * as Logger from "./anon/logger";

var logger = window.console;
var level = Level();
level.logger = logger;

export default level;
