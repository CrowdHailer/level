import * as _ from "./util.ts";
import SpiritLevelState from "./spirit_level_state.ts";

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

export default SpiritLevelDisplay
