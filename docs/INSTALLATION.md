# Installing OVE

OVE needs to be installed before it can be used to control a display. OVE can be installed either by downloading and compiling the source code of the corresponding components or by running a specific installer available on the [**OVE Install**](https://github.com/ove/ove-install/) repository.

All contributors to OVE are encouraged to download and compile the source code. All users of OVE are encouraged to use the OVE installers.

## Installation by running OVE installers

[**OVE Install**](https://github.com/ove/ove-install/) scripts are designed to install OVE into a [Docker](https://www.docker.com/get-started) environment.

### Prerequisites

* [git](https://git-scm.com/downloads)
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Configuring the environment

The deployment environment needs to be pre-configured before running the OVE installers. This involves setting up ports and environment variables.

The ports are pre-configured to a list of common defaults, but can be changed based on end-user requirements. Each port or port-range is defined as a mapping `HOST_PORT:CONTAINER_PORT`. Only the host ports can be changed, and it is important to note that **container ports must not be changed**.

#### Environment variables

Listed below are the environment variables that can be configured before installing OVE:

* `OVE_HOST` - Hostname (or IP address + port) of OVE core
* `TUORIS_HOST` - Hostname (or IP address + port) of the [Tuoris](https://github.com/fvictor/tuoris) service (dependency of SVG application).

Listed below are the environment variables that can be configured before installing [**OVE Asset Services**](https://github.com/ove/ove-asset-services):

* `MYSQL_RANDOM_ROOT_PASSWORD` - This variable is mandatory and must always be set to `yes`. This will generate a random initial password for the root user on the [MariaDB](https://mariadb.org/) database.
* `MYSQL_DATABASE` - The name of the [MariaDB](https://mariadb.org/) database which defaults to `AssetDatabase`.
* `MYSQL_USER` - The username used to connect to the MariaDB database which defaults to `assetManager`.
* `MYSQL_PASSWORD` - The username used to connect to the [MariaDB](https://mariadb.org/) database which defaults to `assetManager`.
* `s3Client__AccessKey` - The access key used to connect to the [S3](https://www.nuget.org/packages/Amazon.S3/) compliant object storage as described in the [Asset Manager documentation](https://github.com/ove/ove-asset-services/blob/master/packages/ove-asset-manager/README.md#configuration).
* `s3Client__Secret` - The secret used to connect to the [S3](https://www.nuget.org/packages/Amazon.S3/) compliant object storage as described in the [Asset Manager documentation](https://github.com/ove/ove-asset-services/blob/master/packages/ove-asset-manager/README.md#configuration).
* `s3Client__ServiceURL` - The service URL of the [S3](https://www.nuget.org/packages/Amazon.S3/) compliant object storage as described in the [Asset Manager documentation](https://github.com/ove/ove-asset-services/blob/master/packages/ove-asset-manager/README.md#configuration).
* `ServiceHostUrl` - Hostname (or IP address + port) of the corresponding Asset Management Service.
* `MariaDB__ConnectionString` - The connection string used by the [Asset Manager](https://github.com/ove/ove-asset-services/tree/master/packages/ove-asset-manager) to connect to [MariaDB](https://mariadb.org/) database. The format of the connection string must always be similar to what is provided, but the port number, database name, username and password must change accordingly if their default values were changed.
* `AssetManagerHostUrl` - Hostname (or IP address + port) of the [Asset Manager](https://github.com/ove/ove-asset-services/tree/master/packages/ove-asset-manager).

### Running the Docker Compose builds

OVE provides separate installers to help users install the necessary components. To install the core components of OVE run:

```sh
SERVICE_VERSION="latest" docker-compose -f docker-compose.ove.yml create
```

To install the [**OVE Asset Services**](https://github.com/ove/ove-asset-services) run:

```sh
SERVICE_VERSION="latest" docker-compose -f docker-compose.assets.yml create
```

Once the installation procedure has completed, the successful installation of OVE can be verified by accessing the [OVE Core API Documentation](http://OVE_CORE_HOST:PORT/api-docs) on a web browser.

### Starting and stopping OVE

To start the Docker runtime run:

```sh
SERVICE_VERSION="latest" docker-compose -f docker-compose.assets.yml up -d
```

To stop the Docker runtime run:

```sh
SERVICE_VERSION="latest" docker-compose -f docker-compose.assets.yml down
```

To clean-up the Docker runtime first stop any active instances and then run:

```sh
docker system prune
docker volume prune
```

## Installation by downloading and compiling source code

All OVE projects use a build system based on [Lerna](https://lernajs.io/). [**OVE Asset Services**](https://github.com/ove/ove-asset-services) are based on [.NET Core](https://github.com/dotnet/core). All other OVE projects are based on [Node.js](https://nodejs.org/en/) and are compiled with [Babel](http://babeljs.io/) and deployed on a [PM2](http://pm2.keymetrics.io/) runtime.

### Prerequisites

* [git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/) (v8.0+)
* [NPM](https://www.npmjs.com/)
* [NPX](https://www.npmjs.com/package/npx): `npm install -global npx`
* [PM2](http://pm2.keymetrics.io/): `npm install -global pm2`
* [Lerna](https://lernajs.io/):  `npm install -global lerna`

Compiling source code for the Docker runtime also require:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

Building [**OVE Asset Services**](https://github.com/ove/ove-asset-services) also require:

* [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core/2.1)
* [NetVips](https://github.com/kleisauke/net-vips)
* [MariaDB](https://mariadb.org/)

The [SVG App](https://github.com/ove/ove-apps/tree/master/packages/ove-app-svg) requires:

* [Tuoris](https://github.com/fvictor/tuoris) (installation instructions available on GitHub repository)

### Downloading source code

All OVE projects can be downloaded from their GitHub repositories:

* OVE Core: [master](https://github.com/ove/ove) | [releases](https://github.com/ove/ove/releases)
* OVE Apps: [master](https://github.com/ove/ove-apps) | [releases](https://github.com/ove/ove-apps/releases)
* OVE Services: [master](https://github.com/ove/ove-services) | [releases](https://github.com/ove/ove-services/releases)
* OVE Asset Services: [master](https://github.com/ove/ove-asset-services) | [releases](https://github.com/ove/ove-asset-services/releases)

The `master` branch of each repository contains the latest code, and can also be cloned if you intend to contribute code or fix issues:

```sh
git clone https://github.com/ove/ove
```

Once the source code has been downloaded OVE can be installed either onto a PM2 runtime or a Docker runtime. The two approaches are explained below.

### Compiling source code for the PM2 runtime using Lerna

Once you have cloned or downloaded the code OVE can be compiled using the [Lerna](https://lernajs.io/) build system:

```sh
cd ove
lerna bootstrap --hoist
lerna run clean
lerna run build
lerna run test
```

Instructions above are only provided for the [**OVE Core**](https://github.com/ove/ove) repository. The steps to follow are similar for other repositories.

#### Starting and stopping OVE

The SVG app requires an instance of [Tuoris](https://github.com/fvictor/tuoris) to be available before starting it:

```sh
pm2 start index.js -f -n "tuoris" -- -p PORT -i 1
```

To start the PM2 environment run:

```sh
OVE_HOST="OVE_CORE_HOST:PORT" TUORIS_HOST="TUORIS_HOST:PORT" pm2 start pm2.json
```

To stop the PM2 environment run:

```sh
pm2 stop pm2.json
```

To clean-up the PM2 environment run:

```sh
pm2 delete pm2.json
```

### Compiling source code for the Docker runtime using build.sh scripts

This approach only works for Linux and MacOS environments. The `build.sh` script corresponding to each repository can be found under the top most folder of the cloned or downloaded repository or within a `packages/PACKAGE_NAME` folder corresponding to each package.

The `build.sh` script can be executed as:

```sh
cd ove
./build.sh
```

Instructions above are only provided for the [**OVE Core**](https://github.com/ove/ove) repository. The steps to follow are similar for other repositories.

#### Starting and stopping OVE

Similar to the `build.sh` script, the `docker-compose.yml` file corresponding to each repository can also be found under the top most folder of the cloned or downloaded repository or within a `packages/PACKAGE_NAME` folder corresponding to each package.

The deployment environment needs to be [pre-configured](#configuring-the-environment) before running these scripts.

To start the Docker runtime run:

```sh
SERVICE_VERSION="latest" docker-compose -f docker-compose.yml up -d
```

To stop the Docker runtime run:

```sh
SERVICE_VERSION="latest" docker-compose -f docker-compose.yml down
```

To clean-up the Docker runtime first stop any active instances and then run:

```sh
docker system prune
docker volume prune
```

## Running OVE

It is recommended to use OVE with Google Chrome, as this is the web browser used for development and in production at the [Data Science Institute](http://www.imperial.ac.uk/data-science/). However, it should also be compatible with other modern web browsers: if you encounter any browser-specific bugs please [report them as an Issue](https://github.com/ove/ove-apps/issues).

Run in Chrome:

* App Control page   `http://OVE_APP_MAPS_HOST:PORT/control.html?oveSectionId=0`
* OVE client pages   `http://OVE_CORE_HOST:PORT/view.html?oveViewId=LocalNine-0` (check [`Spaces.json`](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) for more information)
* OVE JS library     `http://OVE_CORE_HOST:PORT/ove.js`
* OVE API docs       `http://OVE_CORE_HOST:PORT/api-docs`

By default OVE core, all apps and all services run on `localhost`, which should be used as a substitution for `*_HOST` names above. The default `PORT` numbers are:

* 8080 - OVE Core
* 8081 - OVE App Maps
* 8082 - OVE App Images
* 8083 - OVE App HTML
* 8084 - OVE App Videos
* 8085 - OVE App Networks
* 8086 - OVE App Charts
* 8087 - OVE App Alignment
* 8088 - OVE App Audio
* 8089 - OVE App SVG
* 8180 - OVE Service Layout
* 8181 - OVE Asset Manager
* 8182 - OVE Service Image Tiles

The default `PORT` numbers of OVE dependencies are:

* 7080 - Tuoris
* 3306 - MariaDB
