/*jshint jasmine: true, esnext: true */
"use strict";

import * as vector from "./vector_test";
import * as orientationStoreTest from "./orientation_store_test";

describe("Level Application; ", function() {

  it("it should have a working test", function() {
    expect(true).toEqual(true);
  });

  it("hash an experiment test", function () {
    var testObject = Object.create({}, {
      start: {
        get: function () {
          return function (arg) {
            window.console.log(arg);
          };
        }
      }
    });
    testObject.start(4);
  });

});
