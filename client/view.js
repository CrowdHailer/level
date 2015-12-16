/* jshint esnext: true */
'use strict';

export default function View($root){
  var $bubble = $root.querySelector("[data-display~=bubble]");
  var $angleX = $root.querySelector("[data-display~=angleX]");
  var $angleY = $root.querySelector("[data-display~=angleY]");
  var $spiritLevel = $root.querySelector("[data-display~=spirit-level]");

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
  Object.defineProperty(this, "menuActive", {
    set: function(minimised){
      if (typeof minimised !== 'boolean') {
        throw new TypeError("menuActive property should be a boolean");
      }

      if (minimised) {
        $spiritLevel.classList.add("minimised");
      } else {
        $spiritLevel.classList.remove("minimised");
      }
    }
  });
  Object.defineProperty(this, "theme", {
    set: function(theme){
      if (typeof theme !== 'string') {
        throw new TypeError("theme property should be a string");
      }

      $spiritLevel.classList.remove("apple");
      $spiritLevel.classList.remove("blueberry");
      $spiritLevel.classList.remove("cherry");
      $spiritLevel.classList.remove("peach");
      $spiritLevel.classList.add(theme);
    }
  });
}
