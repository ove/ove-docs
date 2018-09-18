# Open Visualisation Environment
---

Open Visualisation Environment is an open-source software stack, designed to be used in large scale visualisation environments like the [Imperial College](http://www.imperial.ac.uk) [Data Science Institute's](http://www.imperial.ac.uk/data-science/) [Data Observatory](http://www.imperial.ac.uk/data-science/data-observatory/).

---

# Build Instructions 

The build system is based on [Lerna](https://lernajs.io/) using [Babel](http://babeljs.io/) for [Node.js](https://nodejs.org/en/) and uses a [PM2](http://pm2.keymetrics.io/) runtime.

## Prerequisites 

* [Node.js](https://nodejs.org/en/) (v4.0+)
* [NPM](https://www.npmjs.com/) 
* [NPX](https://www.npmjs.com/package/npx) `npm install -global npx`
* [PM2](http://pm2.keymetrics.io/) `npm install -global pm2`
* [Lerna](https://lernajs.io/)  `npm install -global lerna`

Building ``OVE.Service.ImageTiles`` also requires the [.NET Core command-line tools](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x).

## Build

Setup the lerna environment:
* `git clone https://github.com/dsi-icl/ove`
* `cd ove`
* `lerna bootstrap --hoist`

Build and start runtime:
* `lerna run clean`
* `lerna run build`
* `pm2 start pm2.json`

## Run

Run in Chrome:
* Control Page `http://localhost:8081/control.html?layers=0,40`
* Client Pages `http://localhost:8081/view.html?oveClientId=0` < check Clients.json for info 

## Stop

* `pm2 stop pm2.json`
* `pm2 delete pm2.json`