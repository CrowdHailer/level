// calculate url from projection
function url(projection){
  var path = "/";
  if (projection.menuVisible) {
    path = path + "menu";
  }

  var queryString = "theme=" + projection.theme;

  return path + "?" + queryString;
}

export default function View() {
  this.render = function(projection){
    history.pushState({}, "", url(projection));
  };
}
