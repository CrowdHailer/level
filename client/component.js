/* jshint esnext: true */
"use strict";

import View from "./view";
import Controller from "./controller";
import * as Vector from "./vector";

var NEUTRAL_ACCELERATION = Vector.create({z: 1});

function projectAcceleration(acceleration){
  // The acceleration is the 3D vector representing the current acceleration of the phone.
  // The neutral acceleration is the normalized reading if the phone was lying screen up on a level surface.

  // angle is the deviation in degrees of the current acceleration from the neutral acceleration
  var angle = Vector.angle(NEUTRAL_ACCELERATION, acceleration);
  // console.log(acceleration.toString());
  // console.log(NEUTRAL_ACCELERATION.toString());
  // console.log(angle);

  // xOffset^2 + yOffset^2 = angle^2
  // acceleration.x * f = xOffset
  // acceleration.y * f = yOffset
  // implies
  // f^2 = angle^2/(acceleration.x^2 + acceleration.x^2)
  var f;
  if (angle === 0) {
    f = 0;
  } else {
    f = Math.sqrt((angle * angle) / (acceleration.x * acceleration.x + acceleration.y * acceleration.y));
  }
  return {
    x: acceleration.x * f,
    y: acceleration.y * f
  };
}

function wrap(state){
  var coords = projectAcceleration(state.acceleration);
  return {
    angleX: coords.x.toFixed(2),
    angleY: coords.y.toFixed(2),
    theme: state.theme,
    menuActive: state.menuActive
  };
}
// Humble view
export default function Component($root, app){
  var view = new View($root);
  var controller = Controller($root, app);

  function update(){
    var presentation = wrap(app.state);
    view.render(presentation);
  }

  this.update = update;
  update();
  app.onUpdate(update);
}
