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
    }
});

// END


// BELONGS IN VIEW
var View = require('ampersand-view');
var view = View.extend({
    bindings: {
        'model.ready': {
            type: 'text',
            hook: 'status'
        },
        'model.menuState': {
            selector: 'aside',
            type: 'booleanClass',
            yes: 'opened',
            no: 'closed'
        }
    },
    events: {
        "click aside.closed": 'open',
        "click aside.opened": 'close'
    },
});

// END

module.exports = app.extend({
    init: function(){
        var self = this;
        window.level = self;

        self.model = new Model();
        // self.router = new Router({pushState: true});

        var domready = require('domready');
        domready(function () {
        //     self.view = new PageView({
        //         el: document.body,
        //         model: self.page
        //     });
        //     // self.view.render();
        //     self.router.on('openMenu', self.page.openMenu, self.page);
        //     self.router.on('closeMenu', self.page.closeMenu, self.page);
        //     self.router.history.start();
            self.ready();
        });
    },
    ready: function () {
        this.model.ready = true;
        window.console.log('Level is now ready');
    },
});

module.exports.init();
