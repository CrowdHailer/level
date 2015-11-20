"use strict";

var rollup = require('rollup');
var typescript = require('rollup-plugin-typescript');

rollup.rollup({
  entry: 'app/scripts/boot.ts',
  plugins: [
    typescript({
      sourceMap: true
    })
  ]
}).then(function (bundle) {
  bundle.write({
    format: "iife",
    moduleName: "level",
    dest: "www/app.js"
  });
}).catch(function(x){
  console.error(x);
});
