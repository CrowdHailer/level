/* jshint esnext: true */
'use strict';

import Map from "carbide/map";
import View from "./view";
import $ from "anon/dom";

import State from "./state";

import * as Dispatcher from "anon/dispatcher";
function Client(){
  this.$view = new View(document);
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


  var dispatcher = Dispatcher.create(window.console);

  this.onUpdate = function(cb){
    dispatcher = dispatcher.register(cb);
  };
  this.openMenu = function(){
    if (state.menu.open) { return; }
    state = State.openMenu(state);
    dispatcher.dispatch();
    this.$view.isSpiritLevelMinimised = this.menuOpen;
  };
  this.closeMenu = function(){
    if (!state.menu.open) { return; }
    state = State.closeMenu(state);
    dispatcher.dispatch();
    // DEBT should call update on an actor
    this.$view.isSpiritLevelMinimised = this.menuOpen;
  };
  this.selectTheme = function(theme){
    // TODO raise error for unknown theme;
    if (state.theme === theme) { return; }

    state = state.set("theme", theme);

    dispatcher.dispatch();
    this.$view.theme = state.theme;
  };
  // Setup step that should be called when initializing a presenter
  this.$view.theme = state.theme;
  this.location = new Location(this);
  this.onUpdate(this.location.update);
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
    client.openMenu();
  });
  delegator.on("click", ".minimised", function(evt){
    evt.preventDefault();
    client.closeMenu();
  });
}
var controller = Controller(document);

var client = new Client();
export default client;
