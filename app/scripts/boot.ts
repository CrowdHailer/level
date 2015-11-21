console.log("starting");
/// <reference path="./gator.d.ts" />
import * as Vector from "./vector.ts";
import * as Action from "./actions.ts";

import SpiritLevelState from "./spirit_level_state.ts";
import Gator from "./gator.js";


class SpiritLevel {
  private state = new SpiritLevelState();
  private context = console;
  callbacks: ((state: SpiritLevelState) => void)[] = [];
  accelerometerReading(raw: any) {
    var vector = Vector.create(raw);
    var action = new Action.AccelerometerReading(vector);
    this.dispatch(action);
  }
  dispatch(action: Action.Action) {
    if(action.type == Action.AccelerometerReading) {
      this.state = SpiritLevelState.newReading(this.state, action.payload, this.context);
    }
    if(action.type == Action.OpenMenu) {
      this.state = SpiritLevelState.minimise(this.state, action.payload, this.context);
    }
    if(action.type == Action.SelectColorScheme) {
      this.state = SpiritLevelState.selectColorScheme(this.state, action.payload, this.context);
    }


    var state = this.state;
    if (this.callbacks.length === 0) {
      console.warn(state);
    } else {
      this.callbacks.forEach(function (listener) {
        listener(state);
      });
    }
  }
}


var $spiritLevel = document.querySelector("[data-component~=spirit-level]");

var spiritLevel = new SpiritLevel();
spiritLevel.callbacks.push(function a (state){ console.log(state); });

import * as _ from "./util.ts";

var PRESCISION = 2;
var round = _.round(PRESCISION);
function SpiritLevelDisplay($root: Element) {

  var $bubble = $root.querySelector("#bubble");
  var $xReadout = $root.querySelector("[data-hook~=xOffset]");
  var $yReadout = $root.querySelector("[data-hook~=yOffset]");
  return {
    update: function (spiritLevelState: SpiritLevelState) {
      var x = spiritLevelState.xOffset;
      var y = spiritLevelState.yOffset;
      $bubble.setAttribute("cx", x.toString());
      $bubble.setAttribute("cy", y.toString());
      $xReadout.textContent = round(x).toString();
      $yReadout.textContent = round(y).toString();
      if (spiritLevelState.minimised) {
        $root.classList.add("minimised");
      } else {
        $root.classList.remove("minimised");
      }
      $root.classList.remove("apple", "blueberry", "cherry", "peach");
      $root.classList.add(spiritLevelState.colorScheme);
    }
  };
}
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


var spiritLevelDisplay = SpiritLevelDisplay($spiritLevel);

import { ready } from "./dom.ts";

ready(function(){
  spiritLevel.callbacks.push(spiritLevelDisplay.update);
  // spiritLevel.dispatch({type: "ACCELEROMETER_READING", payload: Vector.create({x: 5, y: 11})});
  var ui = new UserInput(document, spiritLevel);
});

export { spiritLevel }
