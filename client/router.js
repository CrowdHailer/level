// calculate url from projection
function urlFromState(projection){
  var path = "/";
  if (projection.menuVisible) {
    path = path + "menu";
  }

  var queryString = "theme=" + projection.theme;

  return path + "?" + queryString;
}

function parseLocation(location){
  var THEME_MATCH = /theme=([^&]+)/;
  var query = location.search.slice(1);

  var theme = (query.match(THEME_MATCH) || [])[1] || "apple";

  var menuVisible = location.pathname === "/menu";
  return {theme: theme, menuVisible: menuVisible};
}

export default function Router(window) {
  if ( !(this instanceof Router) ) { return new Router(window); }
  var location = window.location;
  var history = window.history;
  var router = this;
  var withinPopStateCallback = false;

  function getState() {
    return parseLocation(location);
  }

  var lastURL;
  function pushState(state) {
    if (withinPopStateCallback) { return; }
    var url = urlFromState(state);
    if (url === lastURL) { return; }
    history.pushState({}, "", url);
    lastURL = url;
  }
  function replaceState(state) {
    history.replaceState({}, "", urlFromState(state));
  }
  // DEBT remove as property and have push and replace state options

  Object.defineProperty(this, 'state', {
    get: getState,
    set: pushState
  });

  this.callback = function(state){
    console.log(state);
  };

  // DEBT add event listener
  window.onpopstate = function(){
    withinPopStateCallback = true;
    router.callback(getState());
    withinPopStateCallback = false;
  };

  replaceState(getState());
}
