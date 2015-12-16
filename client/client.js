/* jshint esnext: true */

export default {};

// function
var display = Display.create(root);
display.set();

Client = App.new
var state = Map({
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
  theme: "APPLE"
});

function Nav(window){
  function update(state){
    var path = calculatePath(state);
    history.replaceState({url: path});
  }

  return {
    update: update
  };
}

console.log(state);


function AppView($root, app){
  var $spirit-level = $root.querySelector("[data-component~=spirit-level]");
}

function AppComponent($root, app){
  var $spiritLevel = $root.querySelector("[data-component~=spirit-level]");
  var spiritLevel = SpiritLevel.start($spiritLevel);

  app.onStateChange(function(state){

  })
}

function Actions(app){
  function selectTheme(theme){
    // check theme in themes
    app.store.selectTheme(theme)
  }
  this.selectTheme
}
