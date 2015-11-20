
function Accelerometer(context: Window) {
  var userAgent = context.navigator.userAgent;
  var usesInvertedCoordinates = userAgent.match(/a/);

  return {
    start: function () { "blah"; },
    stop: function () { "blah"; },
    ready: function (cb: any) { "blah"; },
    onValue: function (cb: any) { "blah"; },
    state: function (cb: any) { "blah"; }
  };
};
