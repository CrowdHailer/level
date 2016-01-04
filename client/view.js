// calculate url from projection
function url(projection){
  var path = "/";
  if (projection.menuVisible) {
    path = path + "menu";
  }

  var queryString = "theme=" + projection.theme;

  return path + "?" + queryString;
}

export default function View() {
  this.render = function(projection){
    history.pushState({}, "", url(projection));
    var minimised = projection.menuVisible;
    if ($spiritLevel) {
      if (minimised) {
        $spiritLevel.classList.add("minimised");
      } else {
        $spiritLevel.classList.remove("minimised");
      }
      $spiritLevel.classList.remove("apple");
      $spiritLevel.classList.remove("blueberry");
      $spiritLevel.classList.remove("cherry");
      $spiritLevel.classList.remove("peach");
      $spiritLevel.classList.add(projection.theme);
    }
  };
}

import { ready } from "./anon/dom";

var $root, $spiritLevel;
ready(function(){
  $root = document.documentElement;
  $spiritLevel = $root.querySelector("[data-display~=spirit-level]");
});
