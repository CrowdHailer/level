/* jshint esnext: true*/

import typescript from 'rollup-plugin-typescript';

export default {
  entry: 'client/boot.ts',
  format: "iife",
  moduleName: "level",
  dest: "www/client.js",
  sourceMap: true,

  plugins: [
    typescript({
      sourceMap: true
    })
  ]
};
