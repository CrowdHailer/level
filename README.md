Level
=====
**[level.workshop14.io](http://level.workshop14.io)**

Level is a browser based spirit level to demonstrate the capability of native web applications. The live application can be viewed [here](http://level.workshop14.io).

Designed to be offline first, it is built with [ampersandjs](http://ampersandjs.com/) and the offline capability is provide by an appcache.

## Install Locally
This install guide assumes that node and node package manager are available on your system.
First clone this repository to you computer and change into the directory by executing.

```
$ git clone git@github.com:CrowdHailer/level.git
$ cd level
```

Fetch dependencies from npm and copy the scut library of sass components.

```
$ npm run fetch
$ npm install
```

To run locally start with npm

```
$ npm start
```

**NB**
Running locally will not serve the manifest file. This however is copied to the distribution directory by the npm `build` task.

## Possible extensions

Radial angles. Line of greatest slope and total angle.
Sensitivity select.

## Resources

Fruity color schemes
http://bestdesignoptions.com/?p=25572

## Notes
- linear-gradient backgrounds don't work on firefox body

- Android device motion follows specification. Need to invert windows phone and iOS
  http://www.html5rocks.com/en/tutorials/device/orientation/#toc-devicemotion
