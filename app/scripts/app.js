'use strict';

var app = require('ampersand-app');

// BELONGS IN MODEL
var State = require('ampersand-state');

var Main = State.extend({
    session: {
        ready: {
            type: 'boolean',
            default: false
        },
        started: {
            type: 'boolean',
            default: false
        },
        menuShown: {
            type: 'boolean',
            default: false
        },
        colorScheme: {
            type: 'text',
            default: 'default'
        }
    },
    derived: {
        loadStatus: {
            deps: ['ready'],
            fn: function () {
                return this.ready ? 'Ready! Click to begin' : 'Loading...';
            },
        }
    },
    open: function (attribute) {
        this.started = true;
    },
    showMenu: function () {
        this.menuShown = true;
    },
    hideMenu: function () {
        this.colorScheme = 'default';
        this.menuShown = false;
    },
    selectColour: function (path) {
        this.colorScheme = path;
        this.menuShown = false;
    },
});

// END

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

// BELONGS IN VIEW
var View = require('ampersand-view');
var MainView = View.extend({
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
        'model.menuShown': {
            type: 'booleanClass',
            selector: '#spirit-level',
            name: 'minimised'
        },
        'model.colorScheme': {
            type: 'class',
            selector: '#spirit-level > svg'
        }
    },
    events: {
        "click #splash-screen": 'notify',
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
        evt.preventDefault();
        var link = evt.target;
        link = getClosest(link, 'a');
        var local = window.location.host === link.host;
        var path = link.pathname.slice(1);
        if (local) {
            evt.preventDefault();
            this.router.navigate(path);
        }
    }
});

// END

var Router = require('./router');

module.exports = app.extend({
    init: function(){
        var app = this;
        window.level = app;

        app.model = new Main();
        app.router = new Router({pushState: true});

        app.router.on('menu', app.model.showMenu, app.model);
        app.router.on('home', app.model.hideMenu, app.model);
        app.router.on('colorSelect', app.model.selectColour, app.model);
        var domready = require('domready');
        domready(function () {
            app.view = new MainView({
                el: document.body,
                model: app.model
            });
            app.router.history.start();
            app.ready();
        });
    },
    ready: function () {
        this.model.ready = true;
        window.console.log('Level is now ready');
    },
});

module.exports.init();
