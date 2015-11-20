(function () { 'use strict';

    var PRESCISION = 6;
    var round = function (precision) {
        return function (value) {
            return parseFloat(value.toPrecision(precision));
        };
    }(PRESCISION);
    var VectorPrototype = {
        toString: function () {
            return "<Vector x: " + this.x + ", y: " + this.y + ", z: " + this.z + ">";
        }
    };
    // create origin function for 0,0,0 fine as same length as create
    function Vector(raw) {
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
    function origin() {
        return Vector({});
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
        return scale(1.0 / m, v);
    }
    ;
    function dotProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    ;
    function angle(v1, v2) {
        var n1 = normalize(v1);
        var n2 = normalize(v2);
        var cosTheta = dotProduct(n1, n2);
        var thetaRad = Math.acos(cosTheta);
        var thetaDeg = (180 / Math.PI) * thetaRad;
        return round(thetaDeg);
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
            expect(function () {
                vector.x = 3;
            }).toThrowError(TypeError, "setting a property that has only a getter");
            expect(vector.x).toEqual(5);
        });
        it("it should have an immutable y value", function () {
            var vector = create({ y: 5 });
            expect(function () {
                vector.y = 3;
            }).toThrowError(TypeError, "setting a property that has only a getter");
            expect(vector.y).toEqual(5);
        });
        it("it should have an immutable z value", function () {
            var vector = create({ z: 5 });
            expect(function () {
                vector.z = 3;
            }).toThrowError(TypeError, "setting a property that has only a getter");
            expect(vector.z).toEqual(5);
        });
        it("origin should have 0 as a default x value", function () {
            var vector = origin();
            expect(vector.x).toEqual(0);
        });
        it("origin should have 0 as a default y value", function () {
            var vector = origin();
            expect(vector.y).toEqual(0);
        });
        it("origin should have 0 as a default z value", function () {
            var vector = origin();
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
        it("can calculate angle between two vectors", function () {
            var vector1 = create({ x: 1, y: 0, z: 0 });
            var vector2 = create({ x: 1, y: 1, z: 0 });
            var vector3 = create({ x: 0, y: 0, z: 1 });
            expect(angle(vector1, vector1)).toEqual(0);
            expect(angle(vector1, vector2)).toEqual(45);
            expect(angle(vector1, vector3)).toEqual(90);
        });
    });

    describe("Dispatcher", function () {
        var Dispatcher = (function () {
            function Dispatcher() {
                this.stores = {};
            }
            Dispatcher.new = function () {
                return new Dispatcher();
            };
            Dispatcher.prototype.dispatch = function (action) {
                var stores = this.stores;
                Object.keys(stores).forEach(function (key) {
                    var store = stores[key];
                    store.dispatch(action);
                });
                return this;
            };
            Dispatcher.prototype.register_store = function (name, store) {
                this.stores[name] = store;
                return this;
            };
            return Dispatcher;
        })();
        var actions1 = [];
        var actions2 = [];
        var store1 = { dispatch: function (action) { return actions1.push(action); } };
        var store2 = { dispatch: function (action) { return actions2.push(action); } };
        it("should call all stores with the action", function () {
            var dispatcher = Dispatcher.new();
            dispatcher.register_store("store1", store1);
            dispatcher.register_store("store2", store2);
            var action = { type: "FAKE_ACTION" };
            dispatcher.dispatch(action);
            expect(actions1[0]).toBe(action);
            expect(actions2[0]).toBe(action);
        });
    });

    var neutralAcceleration = create({ z: 1 });
    var SpiritLevelState = (function () {
        function SpiritLevelState() {
            this.xOffset = 0;
            this.yOffset = 0;
            this.minimised = false;
            this.colorScheme = "apple";
        }
        SpiritLevelState.newReading = function (state, acceleration, context) {
            // The acceleration is the 3D vector representing the current acceleration of the phone.
            // The neutral acceleration is the normalized reading if the phone was lying screen up on a level surface.
            // angle is the deviation in degrees of the current acceleration from the neutral acceleration
            var angle$$ = angle(neutralAcceleration, acceleration);
            // console.log(acceleration.toString());
            // console.log(neutralAcceleration.toString());
            // console.log(angle);
            // xOffset^2 + yOffset^2 = angle^2
            // acceleration.x * f = xOffset
            // acceleration.y * f = yOffset
            // implies
            // f^2 = angle^2/(acceleration.x^2 + acceleration.x^2)
            var f = Math.sqrt((angle$$ * angle$$) / (acceleration.x * acceleration.x + acceleration.y * acceleration.y));
            state.xOffset = acceleration.x * f;
            state.yOffset = acceleration.y * f;
            return state;
        };
        SpiritLevelState.minimise = function (state, payload, context) {
            state.minimised = true;
            return state;
        };
        SpiritLevelState.selectColorScheme = function (state, payload, context) {
            state.colorScheme = payload;
            state.minimised = false;
            return state;
        };
        return SpiritLevelState;
    })();

    describe("Spirit Level state", function () {
        it("should call all stores with the action", function () {
            var state = new SpiritLevelState();
            var vector = create({ x: 1, z: 1 });
            var newState = SpiritLevelState.newReading(state, vector, console);
            var vector = create({ x: 1, y: 1, z: 1 });
            var newState = SpiritLevelState.newReading(state, vector, console);
            // DEBT check works but not properly checking the maths
        });
    });

    // import * as orientationStoreTest from "./orientation_store_test";
    describe("Level Application; ", function () {
        it("it should have a working test", function () {
            expect(true).toEqual(true);
        });
    });

})();