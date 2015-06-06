'use strict';

var View = require('ampersand-view');
var app = require('ampersand-app');


function getClosest(el, tag) {
  // this is necessary since nodeName is always in upper case
  tag = tag.toUpperCase();
  do {
    if (el.nodeName === tag) {
      // tag name is found! let's return it. :)
      return el;
    }
  } while (el = el.parentNode);

  // not found :(
  return null;
}

module.exports = View.extend({
    session: {
        router: {
            type: 'object',
        }
    },
    initialize: function (attribute) {
        this.router = this.router || app.router;
    },
    bindings: {
        'model.loadStatus': {
            type: 'text',
            hook: 'load-status'
        },
        'model.started': {
            type: 'booleanClass',
            selector: '#splash-screen',
            name: 'hidden'
        },
        'model.ready': {
            type: 'booleanClass',
            selector: '#splash-screen',
            name: 'ready'
        },
        'model.menuShown': {
            type: 'booleanClass',
            selector: '#spirit-level',
            name: 'minimised'
        },
        'model.colorScheme': {
            type: 'class',
            selector: '#spirit-level'
        },
        'model.angleX': {
            type: 'attribute',
            selector: '#bubble', // or hook
            name: 'cx'
        },
        'model.angleXformated' :{
            type: 'text',
            hook: 'angleX'
        },
        'model.angleY': {
            type: 'attribute',
            selector: '#bubble', // or hook
            name: 'cy'
        },
        'model.angleYformated' :{
            type: 'text',
            hook: 'angleY'
        }
    },
    events: {
        "click #splash-screen.ready": 'notify',
        "click a": 'handleLinkClick'
    },
    notify: function (evt) {
        var screenfull = require('screenfull');

        if (screenfull.enabled) {
            // screenfull.request();
        }
        this.model.open();
    },
    handleLinkClick: function (evt) {
        var link = getClosest(evt.target, 'a');
        if (link.pathname == '/about') {
            return;
        }
        evt.preventDefault();
        var local = window.location.host === link.host;
        var path = link.pathname.slice(1);
        if (local) {
            evt.preventDefault();
            this.router.navigate(path);
        }
    }
});
