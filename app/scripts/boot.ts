console.log("starting");
/// <reference path="./gator.d.ts" />

// Setup the stores
import SpiritLevelStore from "./spirit_level_store.ts";
var spiritLevel = new SpiritLevelStore();

// Requires dom
import { ready } from "./dom.ts";

import SpiritLevelDisplay from "./spirit_level_display.ts";

import UserInput from "./user_input.ts";

ready(function(){
  // Create all the presenters once dom elements are available
  var $spiritLevel = document.querySelector("[data-component~=spirit-level]");
  var spiritLevelDisplay = SpiritLevelDisplay($spiritLevel);


  // register the presenters as watchers to individual stores
  // DEBT calls in to array. make add presenter
  spiritLevel.callbacks.push(spiritLevelDisplay.update);

  // Capture input Events
  var ui = new UserInput(document, spiritLevel);
});

export { spiritLevel }
