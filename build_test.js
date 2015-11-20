"use strict";

var rollup = require('rollup');
var typescript = require('rollup-plugin-typescript');

rollup.rollup({
  entry: 'test/level_test.ts',
  plugins: [
    typescript({
      sourceMap: true
    })
  ]
}).then(function (bundle) {
  bundle.write({
    format: "iife",
    moduleName: "test",
    dest: "tmp/test_bundle.js"
  });
}).catch(function(x){
  console.error(x);
});
