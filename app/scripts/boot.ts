console.log("starting");
/// <reference path="./gator.d.ts" />
import * as Vector from "./vector.ts";
import * as Action from "./actions.ts";

import SpiritLevelState from "./spirit_level_state.ts";
import SpiritLevelStore from "./spirit_level_store.ts";
import Gator from "./gator.js";


var $spiritLevel = document.querySelector("[data-component~=spirit-level]");

var spiritLevel = new SpiritLevelStore();
spiritLevel.callbacks.push(function a (state){ console.log(state); });


class UserInput {
  $root: any;
  constructor (element: any, actions: {dispatch: any}) {
    this.$root = element;
    var events = Gator(element, null);
    events.on("click", "[data-hook~=open-menu]", function (e: any) {
      e.preventDefault();
      var action = new Action.OpenMenu();
      spiritLevel.dispatch(action);
    });
    events.on("click", "[data-hook~=select-color-scheme]", function (e: any) {
      e.preventDefault();
      var action = new Action.SelectColorScheme("blueberry");
      spiritLevel.dispatch(action);
    });
  }
}

import SpiritLevelDisplay from "./spirit_level_display.ts";
var spiritLevelDisplay = SpiritLevelDisplay($spiritLevel);

import { ready } from "./dom.ts";

ready(function(){
  spiritLevel.callbacks.push(spiritLevelDisplay.update);
  // spiritLevel.dispatch({type: "ACCELEROMETER_READING", payload: Vector.create({x: 5, y: 11})});
  var ui = new UserInput(document, spiritLevel);
});

export { spiritLevel }
