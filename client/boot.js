import Level from "./level";
import * as Logger from "./anon/logger";

var logger = window.console;
var level = Level({setup: "RUNNING"});
level.logger = logger;

level.view = {
  render: function(projection){
    console.log(projection);
  }
};

export default level;
