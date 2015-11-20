import * as Vector from "./vector.ts";

var neutralAcceleration = Vector.create({z: 1});

class SpiritLevelState {
  xOffset = 0;
  yOffset = 0;
  minimised = false;
  colorScheme = "apple";
  static newReading(state: SpiritLevelState, acceleration: Vector.Vector, context: Console){
    // The acceleration is the 3D vector representing the current acceleration of the phone.
    // The neutral acceleration is the normalized reading if the phone was lying screen up on a level surface.

    // angle is the deviation in degrees of the current acceleration from the neutral acceleration
    var angle = Vector.angle(neutralAcceleration, acceleration);
    // console.log(acceleration.toString());
    // console.log(neutralAcceleration.toString());
    // console.log(angle);

    // xOffset^2 + yOffset^2 = angle^2
    // acceleration.x * f = xOffset
    // acceleration.y * f = yOffset
    // implies
    // f^2 = angle^2/(acceleration.x^2 + acceleration.x^2)
    var f = Math.sqrt((angle * angle) / (acceleration.x * acceleration.x + acceleration.y * acceleration.y));
    state.xOffset = acceleration.x * f;
    state.yOffset = acceleration.y * f;
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

export default SpiritLevelState;
