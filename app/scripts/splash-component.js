/*jshint esnext: true */
"use strict";

import * as ACTIONS from "./actions";

export default function SplashComponent($root, actions) {
  window.console.log($root);
  $root.addEventListener("click", function (evt) {
    actions.acknowledgeSplash();
  });
}
