/* jshint esnext: true */
'use strict';

import Map from "carbide/map";
import View from "./view";
import $ from "anon/dom";

import * as QString from "query-string";
var State = {
  create: function(location){
    var queryString = location.search;
    var query = QString.parse(queryString);

    var state = Map({
      menu: Map({
        open: location.pathname == "/menu",
      }),
      accelerometer: Map({
        reading: Map({
          x: 0,
          y: 0,
          z: 0
        }),
      }),
      theme: query.theme || "APPLE"
    });

    return state;
  },
  openMenu: function(state){
    return state.update("menu", function(map){ return map.set("open", true); });
  },
  closeMenu: function(state){
    return state.update("menu", function(map){ return map.set("open", false); });
  }
};

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

  this.location = new Location(this);

  this.openMenu = function(){
    if (state.menu.open) { return; }
    state = State.openMenu(state);
    this.location.update();
    this.$view.isSpiritLevelMinimised = this.menuOpen;
  };
  this.closeMenu = function(){
    if (!state.menu.open) { return; }
    state = State.closeMenu(state);
    this.location.update();
    // DEBT should call update on an actor
    this.$view.isSpiritLevelMinimised = this.menuOpen;
  };
  this.selectTheme = function(theme){
    // TODO raise error for unknown theme;
    if (state.theme === theme) { return; }

    state = state.set("theme", theme);
    this.location.update();
    this.$view.theme = state.theme;
  };
  // Setup step that should be called when initializing a presenter
  this.$view.theme = state.theme;
}

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
}
var controller = Controller(document);

var client = new Client();
export default client;
