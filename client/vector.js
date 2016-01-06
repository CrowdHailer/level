/* jshint esnext: true */
"use strict";
import Struct from "./node_modules/carbide/struct";

var VECTOR_DEFAULTS = {x: 0, y: 0, z: 0};

function Vector(raw){
  if ( !(this instanceof Vector) ) { return new Vector(raw); }

  return Struct.call(this, VECTOR_DEFAULTS, raw);
}

Vector.prototype = Object.create(Struct.prototype);
Vector.prototype.constructor = Vector;

Object.defineProperty(Vector.prototype, "magnitude", {
  get: function(){
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
});

Vector.prototype.toString = function toString(){
  return "<Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z + ">";
};

export function scale(multiplier, vector){
  var x = multiplier * vector.x;
  var y = multiplier * vector.y;
  var z = multiplier * vector.z;
  return new Vector({x: x, y: y, z: z});
}

export function normalize(vector){
  if (vector.magnitude === 0) {
    throw new RangeError("Zero vector cannot be normalized");
  }
  var x = vector.x / vector.magnitude;
  var y = vector.y / vector.magnitude;
  var z = vector.z / vector.magnitude;
  return new Vector({x: x, y: y, z: z});
}

export function dotProduct (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

export function angle (v1, v2) {
    var n1, n2;
    try {
      n1 = normalize(v1);
      n2 = normalize(v2);
    } catch (err) {
      return 0;
    }
    var cosTheta = dotProduct(n1, n2);
    var thetaRad = Math.acos(cosTheta);
    var thetaDeg = (180/Math.PI) * thetaRad;
    return thetaDeg;
}

export var create = Vector;
export default Vector;
