'use strict';

var Router = require('ampersand-router');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'about': 'about',
        'menu': 'menu',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('home');
    },
    about: function () {
        window.console.log('about');
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
