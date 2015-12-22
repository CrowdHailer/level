/* jshint esnext: true */
/* jshint jasmine: true */
"use strict";

import * as Vector from "../client/vector";

describe("Vector", function() {
  var vector;
  beforeEach(function(){
    vector = new Vector.create({x: 1, y: 2, z: 3});
  });

  it("should have a x value", function() {
    expect(vector.x).toEqual(1);
  });

  it("should have a y value", function() {
    expect(vector.y).toEqual(2);
  });

  it("should have a z value", function() {
    expect(vector.z).toEqual(3);
  });

  it("should have a magnitude", function () {
    expect(vector.magnitude).toBeCloseTo(3.742);
  });

  xit("should print an inspectable string version", function () {
    var vector = Vector.create({x: 3, y: 4, z: 5});
    expect(vector.toString()).toEqual("<Vector x: 3, y: 4, z: 5>");
  });


  xit("should be able to scale a vector", function () {
    var vector = Vector.create({x: 1, y: 2, z: 0});
    var new_vector = Vector.scale(2, vector);
    expect(new_vector.x).toEqual(2);
    expect(new_vector.y).toEqual(4);
    expect(new_vector.z).toEqual(0);
  });

  xit("should be equal to same vector", function () {
    var vector1 = Vector.create({x: 1, y: 2, z: 0});
    var vector2 = Vector.create({x: 1, y: 2, z: 0});
    expect(vector1).toEqual(vector2);
  });

  xit("should be able to normalize a vector", function () {
    var vector = Vector.create({x: 0, y: 3, z: 4});
    var normalizedVector = Vector.create({x: 0, y: 3/5, z: 4/5});
    expect(Vector.normalize(vector)).toEqual(normalizedVector);
  });

  xit("can calculate the dot product of two vectors", function () {
    var vector1 = Vector.create({x: 1, y: 2, z: 0});
    var vector2 = Vector.create({x: 0, y: 3, z: 4});
    expect(Vector.dotProduct(vector1, vector2)).toEqual(6);
  });

  xit("can calculate angle between two vectors", function () {
    var vector1 = Vector.create({x: 1, y: 0, z: 0});
    var vector2 = Vector.create({x: 1, y: 1, z: 0});
    var vector3 = Vector.create({x: 0, y: 0, z: 1});
    expect(Vector.angle(vector1, vector1)).toEqual(0);
    expect(Vector.angle(vector1, vector2)).toEqual(45);
    expect(Vector.angle(vector1, vector3)).toEqual(90);
  });
});
