import * as Vector from "./vector.ts";

export class SpiritLevelState {
  xOffset = 0;
  yOffset = 0;
  minimised = false;
  colorScheme = "apple";
  static newReading(state: SpiritLevelState, payload: Vector.Vector, context: Console){
    state.xOffset = payload.x;
    state.yOffset = payload.y;
    return state;
  }
  static minimise(state: SpiritLevelState, payload: any, context: Console){
    state.minimised = true;
    return state;
  }
  static selectColorScheme(state: SpiritLevelState, payload: string, context: Console){
    state.colorScheme = payload;
    state.minimised = false;
    return state;
  }
}
