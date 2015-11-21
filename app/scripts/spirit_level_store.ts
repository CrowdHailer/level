import * as Action from "./actions.ts";
import * as Vector from "./vector.ts";

import SpiritLevelState from "./spirit_level_state.ts";


class SpiritLevelStore {
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

export default SpiritLevelStore;
