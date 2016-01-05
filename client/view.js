export default function View() {
  var view = this;
  var callbacks = [];
  this.render = function(projection){
    view.projection = projection;
    // console.debug(projection);
    callbacks.forEach(function(cb){
      cb(projection);
    });
  };
  this.addCallback = function(callback){
    if (view.projection) {
      callback(view.projection);
    }
    callbacks.push(callback);
  };
}
