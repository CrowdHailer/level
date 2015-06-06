'use strict';

var app = require('ampersand-app');
var Router = require('./router');
var Main = require('./models/main');
var MainView = require('./views/main_view');

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
            // window.requestAnimationFrame(setModelOrienation);
            app.router.history.start();
            if (window.DeviceMotionEvent) {
                window.addEventListener("devicemotion", deviceMotionHandler);
            }
            app.ready();
        });
    },
    ready: function () {
        this.model.ready = true;
        window.console.log('Level is now ready');
    },
});

module.exports.init();

function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

function scale(a, v) {
    // a: scalar multiplier
    // v: 3 dimensional vector
    return {x: a * v.x, y: a * v.y, z: a * v.z};
}

window.magnitude = magnitude;
window.scale = scale;

window.down = {x: 0, y: 0, z: 1};

var currentScreenOrientation = 0;

window.addEventListener('orientationchange', function() {
       currentScreenOrientation = window.orientation;
}, false);

function round (dp){
    dp = dp || 0;
    var factor = Math.pow(10, dp);
    var bump = Math.pow(0.1, dp + 1); // needed for case 2 d.p on 1.005
    return function(num){
        return Math.round(num * factor + bump) / factor;
    };
}
var r = round(1);

function deviceMotionHandler(deviceMotionEvent) {
    var vector;
    if (navigator.userAgent.match(/Windows/i)) {
        vector = {
            x: -1 * deviceMotionEvent.accelerationIncludingGravity.x,
            y: -1 * deviceMotionEvent.accelerationIncludingGravity.y,
            z: -1 * deviceMotionEvent.accelerationIncludingGravity.z
        };
    } else if (navigator.userAgent.match(/Android/i)) {
        vector = deviceMotionEvent.accelerationIncludingGravity;
    } else {
        vector = {
            x: -1 * deviceMotionEvent.accelerationIncludingGravity.x,
            y: -1 * deviceMotionEvent.accelerationIncludingGravity.y,
            z: -1 * deviceMotionEvent.accelerationIncludingGravity.z
        };
    }
    window.lastDeviceMotionEvent = vector;
    var cosTheta = dotProduct(window.down, vector) / magnitude(vector);
    var thetaRad = Math.acos(cosTheta);
    var theta = 180 * thetaRad / Math.PI;
    var orientation;
    if (currentScreenOrientation == 90) {
        orientation = {x: -1 * vector.y, y: vector.x, z: 0};
    } else if (currentScreenOrientation == -90) {
        orientation = {x: vector.y, y: -1 * vector.x, z: 0};
    } else {
        orientation = {x: vector.x, y: vector.y, z: 0};
    }
    var angleFactor = theta / magnitude(orientation);
    var position = scale(angleFactor, orientation);
    module.exports.model.angleX = r(position.x);
    module.exports.model.angleY = r(position.y);
}
