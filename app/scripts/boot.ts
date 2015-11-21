console.log("starting");
/// <reference path="./gator.d.ts" />
import * as Vector from "./vector.ts";
import * as Action from "./actions.ts";

import SpiritLevelState from "./spirit_level_state.ts";
import SpiritLevelStore from "./spirit_level_store.ts";



var $spiritLevel = document.querySelector("[data-component~=spirit-level]");

var spiritLevel = new SpiritLevelStore();
spiritLevel.callbacks.push(function a (state){ console.log(state); });



import UserInput from "./user_input.ts";
import SpiritLevelDisplay from "./spirit_level_display.ts";
var spiritLevelDisplay = SpiritLevelDisplay($spiritLevel);

import { ready } from "./dom.ts";

ready(function(){
  spiritLevel.callbacks.push(spiritLevelDisplay.update);
  // spiritLevel.dispatch({type: "ACCELEROMETER_READING", payload: Vector.create({x: 5, y: 11})});
  var ui = new UserInput(document, spiritLevel);
});

export { spiritLevel }
