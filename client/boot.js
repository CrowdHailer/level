/* jshint esnext: true */
'use strict';

import Map from "../node_modules/carbide/map";
import View from "./view";

import * as QString from "query-string";
function Client(){
  var $view = new View(document);
  window.$view = $view;
  var queryString = location.search;
  var query = QString.parse(queryString);

  this.state = Map({
    menu: Map({
      open: false,
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
  this.location = new Location();
  this.location.update(this.state);
}

function Location(){
  function update(state){
    var queryString = QString.stringify({
      theme: state.theme
    });
    console.log(queryString);
    history.replaceState({url: queryString}, "", "?" + queryString);
  }
  this.update = update;
}

new Client();
