console.log("starting");

import * as Vector from "./vector.ts";

class SpiritLevelState {
  xOffset = 0;
  yOffset = 0;
  static newReading(state: SpiritLevelState, payload: Vector.Vector, context: Console){
    state.xOffset = payload.x;
    state.yOffset = payload.y;
    return state;
  }
}
interface Action {
  type: string;
  payload: any;
}

class SpiritLevel {
  private state = new SpiritLevelState();
  private context = console;
  callbacks: ((state: SpiritLevelState) => void)[] = []; ;
  dispatch(action: Action) {
    if(action.type == "ACCELEROMETER_READING") {
      this.state = SpiritLevelState.newReading(this.state, action.payload, this.context);
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
function ready(fn: any) {
  if (document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

var $spiritLevel = document.querySelector("[data-component~=spirit-level]");

var spiritLevel = new SpiritLevel();
spiritLevel.callbacks.push(function a (state){ console.log(state); });

function SpiritLevelDisplay($root: Element) {

  var $bubble = $root.querySelector("#bubble");
  var $xReadout = $root.querySelector("[data-hook~=xOffset]");
  var $yReadout = $root.querySelector("[data-hook~=yOffset]");
  return {
    update: function (spiritLevelState: SpiritLevelState) {
      var x = spiritLevelState.xOffset.toString();
      var y = spiritLevelState.yOffset.toString();
      $bubble.setAttribute("cx", x);
      $bubble.setAttribute("cy", y);
      $xReadout.textContent = x;
      $yReadout.textContent = y;
    }
  };
}

var spiritLevelDisplay = SpiritLevelDisplay($spiritLevel);

function closest(selector: string, element: any) {

  while (element) {
    element.webkitMatchesSelector;
    if (element.webkitMatchesSelector(selector)) {
      return element;
    }
    element = element.parentElement;
  }
};


ready(function(){
  spiritLevel.callbacks.push(spiritLevelDisplay.update);
  spiritLevel.dispatch({type: "ACCELEROMETER_READING", payload: Vector.create({x: 5, y: 11})});
  window.addEventListener("click", function _(event) {
    event.preventDefault();
    var t = event.target;
    console.log(t);
    var c = closest("[data-hook~=open-menu]", t);
    console.log(c);
    $spiritLevel.classList.add("minimised");
  });
});

export { spiritLevel }
