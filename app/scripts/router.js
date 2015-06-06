'use strict';

var Router = require('ampersand-router');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'calibrate': 'calibrate',
        'menu': 'menu',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('home');
    },
    calibrate: function () {
        var r = window.confirm("Is your device on a level surface");
        if (r === true) {
            var vector = window.lastDeviceMotionEvent;
            var m = window.magnitude(vector);
            var n = window.scale(1/m, vector);
            window.down = n;
        }
        this.redirectTo('/menu');
    },
    menu: function (attribute) {
        this.trigger('menu');
    },
    catchAll: function (path) {
        var array = ['blueberry', 'cherry', 'peach'];
        var index = array.indexOf(path);
        if (index == -1) {
            this.redirectTo('/');
        } else {
            this.trigger('colorSelect', path);
        }
    }
});
