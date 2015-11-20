import SpiritLevelState from "../app/scripts/spirit_level_state.ts";
import * as Vector from "../app/scripts/vector.ts";

describe("Spirit Level state", function() {

  it("should call all stores with the action", function () {
    var state = new SpiritLevelState();
    var vector = Vector.create({x: 1, z: 1});
    var newState = SpiritLevelState.newReading(state, vector, console);
    var vector = Vector.create({x: 1, y: 1, z: 1});
    var newState = SpiritLevelState.newReading(state, vector, console);
    // DEBT check works but not properly checking the maths
  });
});
