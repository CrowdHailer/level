/* jshint esnext: true */
'use strict';

import Map from "carbide/map";
import * as QString from "query-string";
export default {
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
