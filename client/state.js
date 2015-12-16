/* jshint esnext: true */
'use strict';

import Map from "carbide/map";
import * as QString from "query-string";
export default {
  create: function(location){
    var queryString = location.search;
    var query = QString.parse(queryString);

    var state = Map({
      menu: location.pathname == "/menu",
      accelerometerReading: Map({
          x: 0,
          y: 0,
          z: 0
      }),
      theme: query.theme || "APPLE"
    });

    return state;
  },
  openMenu: function(state){
    return state.set("menuActive", true);
  },
  closeMenu: function(state){
    return state.set("menuActive", false);
  },
  accelerationReading: function(state, reading){
    return state.set("accelerometerReading", Map(reading));
  }
};
