Level
=====
**[level.workshop14.io](http://level.workshop14.io)**

Level is a browser based spirit level to demonstrate the capability of native web applications. The live application can be viewed [here](http://level.workshop14.io).

## Technology

### Hosted on [Surge](surge.sh)

If npm package surge is not globally available you can use the version installed as a dependency on this project.

The surge cli is wrapped in a npm script to deploy this project.
The domain of this project is saved in a `CNAME` file.
The project file to deploy is `/www`, it is added to `.gitignore` and is created as a build step.

To deploy execute the deploy script (this will also run the build script)
```
$ npm run deploy
```

To list all projects you have deployed use

```
$ ./node_modules/.bin/surge list
```

## Resources

Fruity color schemes
http://bestdesignoptions.com/?p=25572

## Notes
- linear-gradient backgrounds don't work on firefox body

- Android device motion follows specification. Need to invert windows phone and iOS
  http://www.html5rocks.com/en/tutorials/device/orientation/#toc-devicemotion
