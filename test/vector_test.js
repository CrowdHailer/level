/*jshint jasmine: true, esnext: true */
"use strict";

import Vector from "../app/scripts/vector";

describe("3D vector", function() {

  it("it should have a x value", function() {
    var vector = Vector({x: 5});
    expect(vector.x).toEqual(5);
  });

  it("it should have a y value", function() {
    var vector = Vector({y: 5});
    expect(vector.y).toEqual(5);
  });

  it("it should have a z value", function() {
    var vector = Vector({z: 5});
    expect(vector.z).toEqual(5);
  });

  it("it should have an immutable x value", function() {
    var vector = Vector({x: 5});
    vector.x = 3;
    expect(vector.x).toEqual(5);
  });

  it("it should have an immutable y value", function() {
    var vector = Vector({y: 5});
    vector.y = 3;
    expect(vector.y).toEqual(5);
  });

    it("it should have an immutable z value", function() {
    var vector = Vector({z: 5});
    vector.z = 3;
    expect(vector.z).toEqual(5);
  });

  it("should should have 0 as a default x value", function() {
    var vector = Vector();
    expect(vector.x).toEqual(0);
  });

  it("should should have 0 as a default y value", function() {
    var vector = Vector();
    expect(vector.y).toEqual(0);
  });

  it("should should have 0 as a default z value", function() {
    var vector = Vector();
    expect(vector.z).toEqual(0);
  });

  it("should print an inspectable string version", function () {
    var vector = Vector({x: 3, y: 4, z: 5});
    expect(vector.toString()).toEqual("<Vector x: 3, y: 4, z: 5>");
  });

  it("should be able to calculate the magnitude of a vector", function () {
    var vector = Vector({x: 3, y: 4, z: 0});
    expect(Vector.magnitude(vector)).toBe(5);
  });

  it("should be able to scale a vector", function () {
    var vector = Vector({x: 1, y: 2, z: 0});
    var new_vector = Vector.scale(2, vector);
    expect(new_vector.x).toEqual(2);
    expect(new_vector.y).toEqual(4);
    expect(new_vector.z).toEqual(0);
  });

  it("should be equal to same vector", function () {
    var vector1 = Vector({x: 1, y: 2, z: 0});
    var vector2 = Vector({x: 1, y: 2, z: 0});
    expect(vector1).toEqual(vector2);
  });

});
