'use strict';

var State = require('ampersand-state');

module.exports = State.extend({
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
            type: 'string',
            default: 'default'
        },
        angleX: {
            type: 'float',
            default: 0
        },
        angleY: {
            type: 'float',
            default: 0
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
