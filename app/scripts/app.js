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
        },
        angleX: {
            type: 'float',
            default: 12.5
        },
        angleY: {
            type: 'float',
            default: -10
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
        },
        'model.angleX': {
            type: 'attribute',
            selector: '#bubble', // or hook
            name: 'cx'
        },
        'model.angleY': {
            type: 'attribute',
            selector: '#bubble', // or hook
            name: 'cy'
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
            timeout();
            app.ready();
        });
    },
    ready: function () {
        this.model.ready = true;
        window.console.log('Level is now ready');
    },
});

module.exports.init();

var degtorad = Math.PI / 180; // Degree-to-Radian conversion

function getBaseRotationMatrix( alpha, beta, gamma ) {
	var _x = beta  ? beta  * degtorad : 0; // beta value
	var _y = gamma ? gamma * degtorad : 0; // gamma value
	var _z = alpha ? alpha * degtorad : 0; // alpha value

	var cX = Math.cos( _x );
	var cY = Math.cos( _y );
	var cZ = Math.cos( _z );
	var sX = Math.sin( _x );
	var sY = Math.sin( _y );
	var sZ = Math.sin( _z );

	//
	// ZXY-ordered rotation matrix construction.
	//

	var m11 = cZ * cY - sZ * sX * sY;
	var m12 = - cX * sZ;
	var m13 = cY * sZ * sX + cZ * sY;

	var m21 = cY * sZ + cZ * sX * sY;
	var m22 = cZ * cX;
	var m23 = sZ * sY - cZ * cY * sX;

	var m31 = - cX * sY;
	var m32 = sX;
	var m33 = cX * cY;

	return [
		m11,    m12,    m13,
		m21,    m22,    m23,
		m31,    m32,    m33
	];
}

function getScreenTransformationMatrix( screenOrientation ) {
	var orientationAngle = screenOrientation ? screenOrientation * degtorad : 0;

	var cA = Math.cos( orientationAngle );
	var sA = Math.sin( orientationAngle );

	// Construct our screen transformation matrix
	var r_s = [
		cA,    -sA,    0,
		sA,    cA,     0,
		0,     0,      1
	];

	return r_s;
}

function matrixMultiply( a, b ) {
	var final = [];

	final[0] = a[0] * b[0] + a[1] * b[3] + a[2] * b[6];
	final[1] = a[0] * b[1] + a[1] * b[4] + a[2] * b[7];
	final[2] = a[0] * b[2] + a[1] * b[5] + a[2] * b[8];

	final[3] = a[3] * b[0] + a[4] * b[3] + a[5] * b[6];
	final[4] = a[3] * b[1] + a[4] * b[4] + a[5] * b[7];
	final[5] = a[3] * b[2] + a[4] * b[5] + a[5] * b[8];

	final[6] = a[6] * b[0] + a[7] * b[3] + a[8] * b[6];
	final[7] = a[6] * b[1] + a[7] * b[4] + a[8] * b[7];
	final[8] = a[6] * b[2] + a[7] * b[5] + a[8] * b[8];

	return final;
}

var deviceOrientationData, currentScreenOrientation;

window.addEventListener('orientationchange', function() {
	currentScreenOrientation = window.orientation;
}, false);

// var deviceOrientationData = null;

window.addEventListener('deviceorientation', function( event ) {
	deviceOrientationData = event;
}, false);

function computeMatrix() {
	var rotationMatrix = getBaseRotationMatrix(
		deviceOrientationData.alpha,
		deviceOrientationData.beta,
		deviceOrientationData.gamma
	); // R

	var screenTransform = getScreenTransformationMatrix( currentScreenOrientation ); // r_s

	var screenAdjustedMatrix = matrixMultiply( rotationMatrix, screenTransform ); // R_s

	// var worldTransform = getWorldTransformationMatrix(); // r_w
    //
	// var finalMatrix = matrixMultiply( screenAdjustedMatrix, worldTransform ); // R_w

	return screenAdjustedMatrix; // [ m11, m12, m13, m21, m22, m23, m31, m32, m33 ]
}


function timeout() {
    setTimeout(function () {
        var m = computeMatrix()
        level.model.angleX = 90 * m[1]
        console.log(level.model.angleX)
        timeout()
    }, 1000);
}

window.timeout = timeout
