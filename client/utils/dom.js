/* jshint esnext: true */
'use strict';

export function matches(selector, element) {
  element.matches = element.matches || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector;
  return element.matches(selector);
}

export function closest(selector, element) {
  while (element) {
    if (matches(selector, element)) { return element; }
    element = element.parentElement;
  }
}

export function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node) {
    if (node == parent) { return true; }
    node = node.parentNode;
  }
  return false;
}

export function Delegator(root){
  this.on = function(eventName, selector, callback){
    root.addEventListener(eventName, function(evt){
      var $trigger = closest(selector, evt.target);
      if ($trigger && isDescendant(root, $trigger)) {
        evt.trigger = $trigger;
        return callback(evt);
      }
    });
  };
}
