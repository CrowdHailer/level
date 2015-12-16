/* jshint esnext: true */
"use strict";

import View from "./view";
import Controller from "./controller";

// Humble view
export default function Component($root, app){
  function wrap(state){
    return {
      angleX: (state.accelerationReading.x || 0).toFixed(2),
      angleY: (state.accelerationReading.y || 0).toFixed(2),
      theme: state.theme,
      menuActive: state.menuActive
    };
  }
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
