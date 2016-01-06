/* jshint esnext: true */
'use strict';

export function openMenu(state){
  return state.set("menuActive", true);
}

export function closeMenu(state){
  return state.set("menuActive", false);
}

export function accelerationReading(state, reading){
  return state.set("acceleration", reading);
}
