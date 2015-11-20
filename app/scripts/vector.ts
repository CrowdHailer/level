/*jshint esnext: true */
"use strict";

var PRESCISION = 6;

var round = function (precision: number) {
  return function (value: number) {
    return parseFloat(value.toPrecision(precision));
  };
}(PRESCISION);

var VectorPrototype = {
  toString: function () {
    return "<Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z + ">";
  }
};

export interface Vector {
  x: number;
  y: number;
  z: number;
}

// create origin function for 0,0,0 fine as same length as create
function Vector(raw: {x?: number, y?: number, z?: number}): Vector {
  // DEBT Keeps a reference to raw so is mutable by proxy;
  return Object.create(VectorPrototype, {
    x: {
      get: function () { return raw.x || 0; }
    },
    y: {
      get: function () { return raw.y || 0; }
    },
    z: {
      get: function () { return raw.z || 0; }
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
  return scale(1.0/m, v);
};

export function dotProduct (v1: Vector, v2: Vector) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
};

export function angle (v1: Vector, v2: Vector) {
    var n1 = normalize(v1);
    var n2 = normalize(v2);
    var cosTheta = dotProduct(n1, n2);
    var thetaRad = Math.acos(cosTheta);
    var thetaDeg = (180/Math.PI) * thetaRad;
    return round(thetaDeg);
};

export var create = Vector;
export default Vector;
