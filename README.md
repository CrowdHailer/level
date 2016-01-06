Level
=====
**[level.workshop14.io](http://level.workshop14.io)**

Level is a browser based spirit level to demonstrate the capability of native web applications. The live application can be viewed [here](http://level.workshop14.io).

## Installation

Clone the repository
```
$ git clone
```
Fetch npm dependencies
```
$ npm i
```
Fetch the submodules
```
$ git submodules update
```
Fetch styles
```
$ mkdir assets/styles/vendor
$ npm run fetch
```

Start
```
$ npm run start
``` 

## Technology

### Served using the [Harp static web server](http://harpjs.com/)

Harp has the same routing rules as surge.sh for client side routing and 404 pages.

To run the project locally use the start script.
```
$ npm start
```

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

### Profile with [Page Speed Insights](https://www.npmjs.com/package/psi)

To run the profiling execute the profile task
```
$ npm run profile
```

At the moment this is not part of any automation but the following should be added.

- Run after deploy
- If staging env setup run after deploy to staging and before deploy to production.
- Would be nice to find a version that can run on locally hosted projects.

### Google Webmaster Tools

> Google Webmaster Tools reveals how Google looks your site online. Webmasters use this tool to fix problems with the site if any. It offers lot of tools for webmasters with which one can improve the visibility of the site and fix problems if any. It will give you the following information

Webmaster tools from Google is used to give information about how Google (the search engine) is crawling your site.
It is most useful to use the Google product as most of the information comes from Google.
Alternatives such as [Bing webmaster tools](http://www.bing.com/toolbox/webmaster) check how your site is performing in Bing searches.

**NOTE** [Webmaster tools are different to analytics](http://www.careerbless.com/web/website/general/topic1.php) and there are many alternative to this service.

## TODOs
These are improvements that could be made on a production app.

### Appcache
Set up app cache.

### Social links
replace opengraph markup
https://github.com/CrowdHailer/level/blob/c7a2bcd5b3104e444e2c71b4a17a7e1c0c2f9b60/app/index.html

### Minify HTML

### Minify CSS

### Critical CSS
With a splash screen it is easy to separate splash css from the rest of the css
Second step is to lasy load the remaining css.

### Setup Deploy Chain
Have a staging environment that can be used as the page speed index test app.
Then deploy to production can be conditional on testing the speed on the development site

### Lint
Use eslint which is the most able to deal with partial use of es6. Needed for rollup.

## Resources

Fruity color schemes
http://bestdesignoptions.com/?p=25572

## Notes
- linear-gradient backgrounds don't work on firefox body

- Android device motion follows specification. Need to invert windows phone and iOS
  http://www.html5rocks.com/en/tutorials/device/orientation/#toc-devicemotion
