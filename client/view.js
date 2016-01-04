// calculate url from projection
function url(projection){
  var path = "/";
  if (projection.menuVisible) {
    path = path + "menu";
  }

  var queryString = "theme=" + projection.theme;

  return path + "?" + queryString;
}

function loadStatusToMessage(status){
  if (status === "COMPLETED") {
    return 'Ready! Click to begin';
  }
  if (status === "FAILED") {
    return 'No Sensor Detected! Device needs accelerometer';
  }
  return 'Loading...';
}

export default function View() {
  var view = this;
  this.render = function(projection){
    view.projection = projection;
    // DEBT setup as debug one levelled console
    // console.log(projection);
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
    if($splashScreen){
      if(projection.splashScreenAcknowledged){
        $splashScreen.classList.add("hidden");
      }
    }
    if ($loadStatus) {
      var message = loadStatusToMessage(projection.setup);
      $loadStatus.innerHTML = message;
    }
  };
}

import { ready } from "./anon/dom";

var $root, $spiritLevel, $splashScreen, $loadStatus;
ready(function(){
  $root = document.documentElement;
  $spiritLevel = $root.querySelector("[data-display~=spirit-level]");
  $splashScreen = $root.querySelector("[data-display~=splash-screen]");
  $loadStatus = $root.querySelector("[data-display~=load-status]");
  // DEBT this hack means that a render is called after all the pieces are available.
});
