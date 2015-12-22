/* jshint esnext: true */
"use strict";
import Struct from "./node_modules/carbide/struct";

var VECTOR_DEFAULTS = {x: 0, y: 0, z: 0};

function Vector(raw){
  if ( !(this instanceof Vector) ) { return new Struct(VECTOR_DEFAULTS, raw); }

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
  var x = vector.x / vector.magnitude;
  var y = vector.y / vector.magnitude;
  var z = vector.z / vector.magnitude;
  return new Vector({x: x, y: y, z: z});
}

export var create = Vector;
