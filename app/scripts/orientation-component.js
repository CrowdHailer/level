/*jshint esnext: true */
"use strict";

import * as ACTIONS from "./actions";

export default function OrientationComponent($root, actions) {

  var $bubble = $root.querySelector("#bubble");
  return {
    update: function (data) {
      $bubble.setAttribute("cx", data.x);
      $bubble.setAttribute("cy", data.y);
    }
  };
}
