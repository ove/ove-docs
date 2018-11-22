# Open Visualisation Environment

---

Open Visualisation Environment is an open-source software stack, designed to be used in large scale visualisation environments like the [Imperial College](http://www.imperial.ac.uk) [Data Science Institute's](http://www.imperial.ac.uk/data-science/) [Data Observatory](http://www.imperial.ac.uk/data-science/data-observatory/).
It is a rewrite of the [GDO](https://github.com/bkavuncu/GDO/) Framework. 

We welcome collaboration under our [Code of Conduct](https://github.com/ove/ove-docs/blob/master/CODE_OF_CONDUCT.md)

---

It is recommended to use OVE with Google Chrome, as this is the web browser used for development and in production at the DSI. However, it should also be compatible with other modern web browsers: if you encounter any browser-specific bugs please [report them as an Issue](https://github.com/ove/ove-apps/issues).

## Build Instructions

The build system is based on [Lerna](https://lernajs.io/) using [Babel](http://babeljs.io/) for [Node.js](https://nodejs.org/en/) and uses a [PM2](http://pm2.keymetrics.io/) runtime.

### Prerequisites

* [git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/) (v8.0+)
* [NPM](https://www.npmjs.com/)
* [NPX](https://www.npmjs.com/package/npx) `npm install -global npx`
* [PM2](http://pm2.keymetrics.io/) `npm install -global pm2`
* [Lerna](https://lernajs.io/)  `npm install -global lerna`

Building ``OVE.Service.ImageTiles`` also requires the [.NET Core command-line tools](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x) [Download here](https://www.microsoft.com/net/download/dotnet-core/2.0).

### Build

Setup the lerna environment:

* `git clone https://github.com/ove/ove`
* `cd ove`
* `lerna bootstrap --hoist`

Build and start runtime:

* `lerna run clean`
* `lerna run build`
* `pm2 start pm2.json`

### Run

Run in Chrome:

* Control Page   `http://localhost:8081/control.html?oveSectionId=0&layers=0`
* Client pages   `http://localhost:8080/view.html?oveClientId=LocalNine-0` < check Spaces.json for info
* OVE JS library `http://localhost:8080/ove.js`
* OVE API docs   `http://localhost:8080/api-docs`

### Stop

* `pm2 stop pm2.json`
* `pm2 delete pm2.json`

## Docker

Alternatively, you can use docker.

```sh
docker build -t ove -f Dockerfile .
docker run -d -p 8080-8090:8080-8090 --name ove ove
```

The app is now running in the port range of 8080 to 8090 on localhost.

### Development

If you are a developer who has made changes to your local copy of OVE, and want to quickly rebuild it without rebuilding the docker container, you can run a container and mount the code as a volume:

    cd /some/path/to/ove
    docker run -it -p 8080-8090:8080-8090 -v $PWD:/code ove bash

and then, inside the container, run:

    cd /code
    lerna bootstrap --hoist && lerna run clean && lerna run build
    pm2 start pm2.json
