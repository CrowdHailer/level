/* jshint esnext: true */
'use strict';

window.console.log("hello");

import { closest, isDescendant } from "./utils/dom";

export function on(eventName, selector, callback){
  document.addEventListener(eventName, function(evt){
    var $trigger = closest(selector, evt.target);
    if ($trigger && isDescendant(document, $trigger)) {
      evt.trigger = $trigger;
      return callback(evt);
    }
  });
}
