/*jshint esnext: true */
"use strict";

var PRESCISION = 6;

var round = function (precision: number) {
  return function (value: number) {
    return parseInt(value.toPrecision(precision));
  };
}(PRESCISION);

var VectorPrototype = {
  toString: function () {
    return "<Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z + ">";
  }
};

interface Vector {
  x: number;
  y: number;
  z: number;
}

// create origin function for 0,0,0 fine as same length as create
function Vector(raw: {x?: number, y?: number, z?: number}): Vector {
  // DEBT Keeps a reference to raw so is mutable by proxy;
  return Object.create(VectorPrototype, {
    x: {
      get: function () { return raw.x || 0; },
      set: function () { /* DEBT should return new vector or throw error */ }
    },
    y: {
      get: function () { return raw.y || 0; },
      set: function () { /* DEBT should return new vector or throw error */ }
    },
    z: {
      get: function () { return raw.z || 0; },
      set: function () { /* DEBT should return new vector or throw error */ }
    }
  });
}
export function origin () {
  return Vector({});
}

export function magnitude (v: Vector) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
};

export function scale (a: number, v: Vector) {
    var x = round(a * v.x);
    var y = round(a * v.y);
    var z = round(a * v.z);

    return Vector({x: x, y: y, z: z});
};

export function normalize (v: Vector) {
  var m = magnitude(v);
  return scale(1/m, v);
};

export function dotProduct (v1: Vector, v2: Vector) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
};

export var create = Vector;
export default Vector;
