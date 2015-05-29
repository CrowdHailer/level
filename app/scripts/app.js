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
        opened: {
            type: 'boolean',
            default: false
        },
        showMenu: {
            type: 'boolean',
            default: false
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
        this.opened = true;
    },
    showMenu: function () {
        this.showMenu = true;
    }
});

// END


// BELONGS IN VIEW
var View = require('ampersand-view');
var MainView = View.extend({
    bindings: {
        'model.loadStatus': {
            type: 'text',
            hook: 'load-status'
        },
        'model.opened': {
            type: 'booleanClass',
            selector: '#splash-screen',
            name: 'hidden'
        },
        'model.showMenu': {
            type: 'booleanClass',
            selector: '#spirit-level',
            name: 'minimised'
        }
    },
    events: {
        "click #splash-screen": 'notify',
        "click a": 'handleLinkClick'
    },
    notify: function (evt) {
        var screenfull = require('screenfull');

        if (screenfull.enabled) {
            screenfull.request();
        }
        this.model.open();
    },
    handleLinkClick: function (evt) {
        evt.preventDefault();
        var link = evt.target;
        var local = window.location.host === link.host;
        var path = link.pathname.slice(1);
        if (local) {
            evt.preventDefault();
            level.router.navigate(path);
        }
    },
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
