function loadStatusToMessage(status){
  if (status === "COMPLETED") {
    return 'Ready! Click to begin';
  }
  if (status === "FAILED") {
    return 'No Sensor Detected! Device needs accelerometer';
  }
  return 'Loading...';
}

export default function View(router) {
  var view = this;
  var callbacks = [function (projection) {
    router.state = projection;
  }, function (projection) {
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
  }];
  this.render = function(projection){
    view.projection = projection;
    console.debug(projection);
    callbacks.forEach(function(cb){
      cb(projection);
    });
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
