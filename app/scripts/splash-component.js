/*jshint esnext: true */
"use strict";

import * as ACTIONS from "./actions";

export default function SplashComponent($root, actions) {

  var $loadStatus = $root.querySelector("[data-hook~=load-status]");

  return {
    update: function (data) {
      window.console.log(data);

      if (data.ready) {
        $loadStatus.innerHTML = "Ready! Click to begin";

        $root.addEventListener("click", function (evt) {
          actions.acknowledgeSplash();
        });
      }

      if (data.acknowledged) {
        $root.classList.add("hidden");
      }
    }
  };
}
