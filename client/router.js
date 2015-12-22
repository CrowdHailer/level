/* jshint esnext: true */
'use strict';

import * as QString from "query-string";
// DEBT call router
export default function Router(app){
  function url(projection){
    var path = "/";
    if (projection.menuActive) {
      path = path + "menu";
    }

    var query = {theme: projection.theme.toLowerCase(), "log-level": projection.logLevel};
    var queryString = QString.stringify(query);

    return path + "?" + queryString;
  }


  history.replaceState({}, "", url(app.state));
  var current = "";
  function update(){
    var replacement = url(app.state);
    if (current === replacement) {
      return;
    }
    history.pushState({}, "", replacement);
    current = replacement;
  }
  this.update = update;
  update();
  app.onUpdate(update);
}
