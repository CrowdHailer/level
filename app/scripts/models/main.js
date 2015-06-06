'use strict';
function formatNumber(number){
    number = number || 0;
    var string = '';
    var array = (number + '').split('.');
    var digits = array[0];
    var tmp;
    if (digits.indexOf('-') != -1){
        string += '-';
        tmp = digits.split('-')[1];
        if (tmp.length == 1){
            string += '0';
        }
        string += tmp;
    } else {
        string += '+';
        if (digits.length == 1) {
            string += '0';
        }
        string += digits;
    }
    var decimals = array[1] || '0';
    if (decimals.length == 1) {
        decimals += '0';
    }
    string = string + '.' + decimals;
    return string;
}

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
        },
        sensorError: {
            type: 'boolean',
            default: false
        }
    },
    derived: {
        loadStatus: {
            deps: ['ready', 'sensorError'],
            fn: function () {
                if (this.ready && !this.sensorError) {
                    return 'Ready! Click to begin';
                } else if (this.sensorError) {
                    return 'No Sensor Detected! Click to continue';
                } else {
                    return 'Loading...';
                }
            },
        },
        angleXformated: {
            deps: ['angleX'],
            fn: function () {
                return formatNumber(this.angleX);
            }
        },
        angleYformated: {
            deps: ['angleY'],
            fn: function () {
                return formatNumber(this.angleY);
            }
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
    checkLive: function (attribute) {
        var v = window.lastDeviceMotionEvent || {x: 0, y: 0, z:0};
        if (v.x === 0 && v.y === 0 && v.z === 0) {
            this.sensorFail();
            this.ready = true;
        } else {
            // eurgh
            window.level.ready();
        }
    },
    sensorFail: function (attribute) {
        this.sensorError = true;
    },
});
