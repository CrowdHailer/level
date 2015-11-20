/*jshint esnext: true */
"use strict";

var prescision = 6;

var VectorPrototype = {
  toString: function () {
    return "<Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z + ">";
  }
};

interface Vector {
  x: number,
  y: number,
  z: number
}

function Vector(raw={x: 0, y: 0, z: 0}): Vector {
  return Object.create(VectorPrototype, {
    x: {
      get: function () { return raw.x; },
      set: function () { /* DEBT should return new vector or throw error */ }
    },
    y: {
      get: function () { return raw.y; },
      set: function () { /* DEBT should return new vector or throw error */ }
    },
    z: {
      get: function () { return raw.z; },
      set: function () { /* DEBT should return new vector or throw error */ }
    }
  });
}

export function magnitude (v: Vector) {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
};

export function scale (a: number, v: Vector) {
    var x = parseFloat((a * v.x).toPrecision(prescision));
    var y = parseFloat((a * v.y).toPrecision(prescision));
    var z = parseFloat((a * v.z).toPrecision(prescision));

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
