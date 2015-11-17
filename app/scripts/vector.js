/*jshint esnext: true */
"use strict";

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
    return {x: a * v.x, y: a * v.y, z: a * v.z};
};

export default Vector;
