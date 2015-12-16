/* jshint esnext: true */
'use strict';

import Map from "../node_modules/carbide/map";
import View from "./view";

import * as QString from "query-string";
function Client(){
  this.$view = new View(document);
  window.$view = this.$view;
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
  Object.defineProperty(this, "url", {
    get: function(){
      var url = "/";
      if (state.menu.open) { url = url + "menu"; }
      var query = {theme: state.theme.toLowerCase()};
      queryString = QString.stringify(query);
      return url + "?" + queryString;
    }
  });
  Object.defineProperty(this, "menuOpen", {
    get: function(){
      return state.menu.open;
    }
  });

  this.location = new Location(this);

  this.openMenu = function(){
    if (state.menu.open) { return; }
    // DEBT replaces menu map will fail with new keys
    state = state.set("menu", Map({open: true}));
    this.location.update();
    this.$view.isSpiritLevelMinimised = this.menuOpen;
  };
  this.closeMenu = function(){
    if (!state.menu.open) { return; }
    // DEBT replaces menu map will fail with new keys
    state = state.set("menu", Map({open: false}));
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
  history.replaceState({}, "", projection.url);
  function update(){
    history.pushState({}, "", projection.url);
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
