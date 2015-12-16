/* jshint esnext: true */
'use strict';

export default function View($root){
  var $bubble = $root.querySelector("[data-display~=bubble]");

  Object.defineProperty(this, "angleX", {
    set: function(angle){
      $bubble.setAttribute("cx", angle);
    }
  });
  Object.defineProperty(this, "angleY", {
    set: function(angle){
      $bubble.setAttribute("cy", angle);
    }
  });
}
