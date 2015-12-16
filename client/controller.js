/* jshint esnext: true */
'use strict';

import { Delegator } from "./utils/dom";
export default function Controller($root, app){
  var delegator = new Delegator($root);
  delegator.on("click", "[data-command~=open-menu]", function(evt){
    evt.preventDefault();
    app.openMenu();
  });
  delegator.on("click", ".minimised", function(evt){
    evt.preventDefault();
    app.closeMenu();
  });
  delegator.on("click", "[data-command~=select-theme]", function(evt){
    evt.preventDefault();
    app.selectTheme(evt.trigger.dataset.theme);
    app.closeMenu();
  });
}
