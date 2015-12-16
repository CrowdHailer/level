/* jshint esnext: true */
'use strict';

export default function View($root){
  var $bubble = $root.querySelector("[data-display~=bubble]");
  var $angleX = $root.querySelector("[data-display~=angleX]");
  var $angleY = $root.querySelector("[data-display~=angleY]");

  Object.defineProperty(this, "angleX", {
    set: function(angle){
      if (typeof angle !== 'string') {
        throw new TypeError("angleX property should be a string");
      }

      $bubble.setAttribute("cx", angle);
      $angleX.innerHTML = angle;
    }
  });
  Object.defineProperty(this, "angleY", {
    set: function(angle){
      if (typeof angle !== 'string') {
        throw new TypeError("angleY property should be a string");
      }
      
      $bubble.setAttribute("cy", angle);
      $angleY.innerHTML = angle;
    }
  });
}
