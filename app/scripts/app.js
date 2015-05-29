'use strict';

var app = require('ampersand-app');

// BELONGS IN MODEL
var State = require('ampersand-state');

var Model = State.extend({
    session: {
        ready: {
            type: 'boolean',
            default: false
        },
        opened: {
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
});

// END


// BELONGS IN VIEW
var View = require('ampersand-view');
var View = View.extend({
    bindings: {
        'model.loadStatus': {
            type: 'text',
            hook: 'load-status'
        },
        'model.opened': {
            type: 'booleanClass',
            selector: '#splash-screen',
            name: 'hidden'
        }
    },
    events: {
        "click #splash-screen": 'notify',
    },
    notify: function (evt) {
        var screenfull = require('screenfull');

        if (screenfull.enabled) {
            screenfull.request();
        }
        this.model.open();
    },
});

// END

module.exports = app.extend({
    init: function(){
        var app = this;
        window.level = app;

        app.model = new Model();
        // app.router = new Router({pushState: true});

        var domready = require('domready');
        domready(function () {
            app.view = new View({
                el: document.body,
                model: app.model
            });
        //     // app.view.render();
        //     app.router.on('openMenu', app.page.openMenu, app.page);
        //     app.router.on('closeMenu', app.page.closeMenu, app.page);
        //     app.router.history.start();
            app.ready();
        });
    },
    ready: function () {
        this.model.ready = true;
        window.console.log('Level is now ready');
    },
});

module.exports.init();
