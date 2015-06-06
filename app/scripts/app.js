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
                setTimeout(function () {
                    app.model.checkLive();
                }, 600);
            } else {
                app.model.sensorFail();
            }
            // app.ready();
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
    // Fix vector to handle the fact iOS and Windows define it backwards
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
    // Record last device motion for down setting
    window.lastDeviceMotionEvent = vector;
    // Magnitude of down vector always one
    var cosTheta = dotProduct(window.down, vector) / magnitude(vector);
    var thetaRad = Math.acos(cosTheta);
    var theta = 180 * thetaRad / Math.PI;
    var orientation;
    // plane factor for intersection
    var planeFactor = down.x * vector.y + down.y * vector.x + down.z * vector.z
    var intersectionPoint = scale(1/planeFactor, vector);
    var x = intersectionPoint.x - down.x;
    var y = intersectionPoint.y - down.y;
    // To calculate the calibrated version we need to fine the plane perpendicular to the current down vector
    // assuming down vector has magnitude 1 then this is
    // di *x + dj * y + dk * z = 1
    // the plane factor is a multiplication factor on the current vector to find point of intersection
    
    if (currentScreenOrientation == 90) {
        orientation = {x: -1 * y, y: x, z: 0};
    } else if (currentScreenOrientation == -90) {
        orientation = {x: y, y: -1 * x, z: 0};
    } else {
        orientation = {x: x, y: y, z: 0};
    }
    var angleFactor = theta / magnitude(orientation);
    var position = scale(angleFactor, orientation);
    module.exports.model.angleX = r(position.x);
    module.exports.model.angleY = r(position.y);
}
alert('boom')
