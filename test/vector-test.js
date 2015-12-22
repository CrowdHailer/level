/* jshint esnext: true */
/* jshint jasmine: true */
"use strict";

import * as Vector from "../client/vector";

// DEBT are not properly equal to instances of the same. Should implement is protocol.
// DEBT to string method should be available on struct.

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

  it("should print an inspectable string version", function () {
    expect(vector.toString()).toEqual("<Vector x: 1, y: 2, z: 3>");
  });

  describe("that is scaled", function(){
    beforeEach(function(){
      vector = Vector.scale(2, vector);
    });

    it("should have a x value", function() {
      expect(vector.x).toEqual(2);
    });

    it("should have a y value", function() {
      expect(vector.y).toEqual(4);
    });

    it("should have a z value", function() {
      expect(vector.z).toEqual(6);
    });
  });

  describe("that is normalized", function(){
    beforeEach(function(){
      vector = Vector.normalize(vector);
    });

    it("should have a x value", function() {
      expect(vector.x).toBeCloseTo(0.267);
    });

    it("should have a y value", function() {
      expect(vector.y).toBeCloseTo(0.535);
    });

    it("should have a z value", function() {
      expect(vector.z).toBeCloseTo(0.802);
    });
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
