/* jshint esnext: true */
'use strict';

import Map from "carbide/map";
import View from "./view";
import $ from "anon/dom";

import State from "./state";

import * as Dispatcher from "anon/dispatcher";
function App(){
  var dispatcher = Dispatcher.create(window.console);
  var state = State.create(window.location);

  Object.defineProperty(this, "menuOpen", {
    get: function(){
      return state.menu.open;
    }
  });
  Object.defineProperty(this, "theme", {
    get: function(){
      return state.theme;
    }
  });

  this.onUpdate = function(cb){
    dispatcher = dispatcher.register(cb);
  };
  this.openMenu = function(){
    if (state.menu.open) { return; }
    state = State.openMenu(state);
    dispatcher.dispatch();
  };
  this.closeMenu = function(){
    if (!state.menu.open) { return; }
    state = State.closeMenu(state);
    dispatcher.dispatch();
  };
  this.selectTheme = function(theme){
    // TODO raise error for unknown theme;
    if (state.theme === theme) { return; }

    state = state.set("theme", theme);

    dispatcher.dispatch();
  };
}

import * as QString from "query-string";
function Location(projection){
  function url(projection){
    var path = "/";
    if (projection.menuOpen) {
      path = path + "menu";
    }

    var query = {theme: projection.theme.toLowerCase()};
    var queryString = QString.stringify(query);

    return path + "?" + queryString;
  }


  history.replaceState({}, "", url(projection));
  function update(){
    history.pushState({}, "", url(projection));
  }
  this.update = update;
}

import { Delegator } from "./utils/dom";
function Controller($root){
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
var controller = Controller(document);

var app = new App();
var $view = new View(document);
$view.isSpiritLevelMinimised = app.menuOpen;
$view.theme = app.theme;
var myLocation = new Location(app);
app.onUpdate(myLocation.update);
myLocation.update();
app.onUpdate(function(){
  $view.isSpiritLevelMinimised = app.menuOpen;
  $view.theme = app.theme;
});
export default app;
