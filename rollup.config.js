/* jshint esnext: true*/
import commonjs from 'rollup-plugin-commonjs';
import npm from 'rollup-plugin-npm';

export default {
  entry: 'client/boot.js',
  format: "iife",
  moduleName: "Level",
  dest: "www/client.js",
  sourceMap: true,
  plugins: [
    npm({ jsnext: true, main: true }),
    commonjs()
  ]
};
