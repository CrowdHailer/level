/*jshint esnext: true */
"use strict";

var prescision = 6;

var VectorPrototype = {
  toString: function () {
    return "<Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z + ">";
  }
};

function Vector(raw) {
  var x, y, z;
  raw = raw || {};
  x = raw.x || 0;
  y = raw.y || 0;
  z = raw.z || 0;

  return Object.create(VectorPrototype, {
    x: {
      get: function () { return x; },
      set: function () { /* DEBT should return new vector or throw error */ }
    },
    y: {
      get: function () { return y; },
      set: function () { /* DEBT should return new vector or throw error */ }
    },
    z: {
      get: function () { return z; },
      set: function () { /* DEBT should return new vector or throw error */ }
    }
  });
}

Vector.magnitude = function (v) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
};

Vector.scale = function (a, v) {
    var x = parseFloat((a * v.x).toPrecision(prescision));
    var y = parseFloat((a * v.y).toPrecision(prescision));
    var z = parseFloat((a * v.z).toPrecision(prescision));

    return Vector({x: x, y: y, z: z});
};

Vector.normalize = function (v) {
  var magnitude = Vector.magnitude(v);
  return Vector.scale(1/magnitude, v);
};

export default Vector;
