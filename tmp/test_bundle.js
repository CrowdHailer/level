(function () { 'use strict';

    var PRESCISION = 6;
    var round = function (precision) {
        return function (value) {
            return parseInt(value.toPrecision(precision));
        };
    }(PRESCISION);
    var VectorPrototype = {
        toString: function () {
            return "<Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z + ">";
        }
    };
    function Vector(raw) {
        if (raw === void 0) { raw = { x: 0, y: 0, z: 0 }; }
        return Object.create(VectorPrototype, {
            x: {
                get: function () { return raw.x; },
                set: function () { }
            },
            y: {
                get: function () { return raw.y; },
                set: function () { }
            },
            z: {
                get: function () { return raw.z; },
                set: function () { }
            }
        });
    }
    function magnitude(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }
    ;
    function scale(a, v) {
        var x = round(a * v.x);
        var y = round(a * v.y);
        var z = round(a * v.z);
        return Vector({ x: x, y: y, z: z });
    }
    ;
    function normalize(v) {
        var m = magnitude(v);
        return scale(1 / m, v);
    }
    ;
    function dotProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    ;
    var create = Vector;

    describe("3D vector", function () {
        it("it should have a x value", function () {
            var vector = create({ x: 5 });
            expect(vector.x).toEqual(5);
        });
        it("it should have a y value", function () {
            var vector = create({ y: 5 });
            expect(vector.y).toEqual(5);
        });
        it("it should have a z value", function () {
            var vector = create({ z: 5 });
            expect(vector.z).toEqual(5);
        });
        it("it should have an immutable x value", function () {
            var vector = create({ x: 5 });
            vector.x = 3;
            expect(vector.x).toEqual(5);
        });
        it("it should have an immutable y value", function () {
            var vector = create({ y: 5 });
            vector.y = 3;
            expect(vector.y).toEqual(5);
        });
        it("it should have an immutable z value", function () {
            var vector = create({ z: 5 });
            vector.z = 3;
            expect(vector.z).toEqual(5);
        });
        it("should should have 0 as a default x value", function () {
            var vector = create();
            expect(vector.x).toEqual(0);
        });
        it("should should have 0 as a default y value", function () {
            var vector = create();
            expect(vector.y).toEqual(0);
        });
        it("should should have 0 as a default z value", function () {
            var vector = create();
            expect(vector.z).toEqual(0);
        });
        it("should print an inspectable string version", function () {
            var vector = create({ x: 3, y: 4, z: 5 });
            expect(vector.toString()).toEqual("<Vector x: 3, y: 4, z: 5>");
        });
        it("should be able to calculate the magnitude of a vector", function () {
            var vector = create({ x: 3, y: 4, z: 0 });
            expect(magnitude(vector)).toBe(5);
        });
        it("should be able to scale a vector", function () {
            var vector = create({ x: 1, y: 2, z: 0 });
            var new_vector = scale(2, vector);
            expect(new_vector.x).toEqual(2);
            expect(new_vector.y).toEqual(4);
            expect(new_vector.z).toEqual(0);
        });
        it("should be equal to same vector", function () {
            var vector1 = create({ x: 1, y: 2, z: 0 });
            var vector2 = create({ x: 1, y: 2, z: 0 });
            expect(vector1).toEqual(vector2);
        });
        it("should be able to normalize a vector", function () {
            var vector = create({ x: 0, y: 3, z: 4 });
            var normalizedVector = create({ x: 0, y: 3 / 5, z: 4 / 5 });
            expect(normalize(vector)).toEqual(normalizedVector);
        });
        it("can calculate the dot product of two vectors", function () {
            var vector1 = create({ x: 1, y: 2, z: 0 });
            var vector2 = create({ x: 0, y: 3, z: 4 });
            expect(dotProduct(vector1, vector2)).toEqual(6);
        });
    });


    var vector_test = Object.freeze({

    });

    // import * as orientationStoreTest from "./orientation_store_test";
    describe("Level Application; ", function () {
        it("it should have a working test", function () {
            expect(true).toEqual(true);
        });
    });

})();