# Installing OVE

OVE needs to be installed before it can be used to control a display. OVE can be installed either by downloading and compiling the source code of the corresponding components or by running a specific installer available on the [**OVE Install**](https://github.com/ove/ove-install/) repository.

All contributors to OVE are encouraged to download and compile the source code. All users of OVE are encouraged to use the OVE installers.

## Installation by running OVE installers

[**OVE Install**](https://github.com/ove/ove-install/) scripts are designed to install OVE into a [Docker](https://www.docker.com/get-started) environment.

### Prerequisites

* [git](https://git-scm.com/downloads)
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

[**OVE Asset Services**](https://github.com/ove/ove-asset-services) also requires:

* [S3](https://aws.amazon.com/s3/) or an [S3-compatible object storage](http://www.s3-client.com/s3-compatible-storage-solutions.html) such as [Minio](https://www.minio.io/)

### Configuring the environment

The deployment environment needs to be pre-configured before running the OVE installers. This involves setting up ports and environment variables.

The ports are pre-configured to a list of common defaults, but can be changed based on end-user requirements. Each port or port-range is defined as a mapping `HOST_PORT:CONTAINER_PORT`. Only the host ports can be changed, and it is important to note that **container ports must not be changed**.

#### Environment variables

Before installing OVE you must configure the environment variables by editing the `docker-compose.ove.yml` file. The environment variables that can be configured are:

* `OVE_HOST` - Hostname (or IP address) + port of OVE core
* `TUORIS_HOST` - Hostname (or IP address) + port of the [Tuoris](https://github.com/fvictor/tuoris) service (dependency of SVG application).

Before installing [**OVE Asset Services**](https://github.com/ove/ove-asset-services) you must configure the environment variables by editing the `docker-compose.assets.yml` file. The environment variables that can be configured are:

* `MYSQL_RANDOM_ROOT_PASSWORD` - This variable is mandatory and we recommend it be set to `yes`. This will generate a random initial password for the root user on the [MariaDB](https://mariadb.org/) database.
* `MYSQL_DATABASE` - The name of the [MariaDB](https://mariadb.org/) database which defaults to `AssetDatabase`.
* `MYSQL_USER` - The username used to connect to the MariaDB database which defaults to `assetManager`.
* `MYSQL_PASSWORD` - The username used to connect to the [MariaDB](https://mariadb.org/) database which defaults to `assetManager`.
* `s3Client__AccessKey` - The access key used to connect to the [S3](https://aws.amazon.com/s3/) compliant object storage as described in the [Asset Manager documentation](https://github.com/ove/ove-asset-services/blob/master/packages/ove-asset-manager/README.md#configuration).
* `s3Client__Secret` - The secret used to connect to the [S3](https://aws.amazon.com/s3/) compliant object storage as described in the [Asset Manager documentation](https://github.com/ove/ove-asset-services/blob/master/packages/ove-asset-manager/README.md#configuration).
* `s3Client__ServiceURL` - The service URL of the [S3](https://aws.amazon.com/s3/) compliant object storage as described in the [Asset Manager documentation](https://github.com/ove/ove-asset-services/blob/master/packages/ove-asset-manager/README.md#configuration).
* `ServiceHostUrl` - Hostname (or IP address) + port of the corresponding Asset Management Service.
* `MariaDB__ConnectionString` - The connection string used by the [Asset Manager](https://github.com/ove/ove-asset-services/tree/master/packages/ove-asset-manager) to connect to [MariaDB](https://mariadb.org/) database. The format of the connection string must always be similar to what is provided, but the port number, database name, username and password must change accordingly if their default values were changed.
* `AssetManagerHostUrl` - Hostname (or IP address) + port of the [Asset Manager](https://github.com/ove/ove-asset-services/tree/master/packages/ove-asset-manager).

### Starting and stopping the OVE Docker applications

OVE provides separate installation scripts to help users install the necessary components. To install and start OVE on Docker run:

```sh
docker-compose -f docker-compose.ove.yml up -d
```

If you wish to install OVE without it automatically starting, use the command:

```sh
docker-compose -f docker-compose.ove.yml up --no-start
```

Once the installation procedure has completed and OVE has been started, the successful installation of OVE can be verified by accessing the OVE API docs (located at: `http://OVE_CORE_HOST:PORT/api-docs` as noted in the [Running OVE](#running-ove) section) using a web browser.

To install and start [**OVE Asset Services**](https://github.com/ove/ove-asset-services) on Docker run:

```sh
docker-compose -f docker-compose.assets.yml up -d
```

Once the services have started, you can check their status by running:

```sh
docker ps
```

The `ps` command will list containers along with their `CONTAINER_ID`. Then, to check logs of an individual container, run:

```sh
docker logs <CONTAINER_ID>
```

To stop the Docker application run:

```sh
docker-compose -f docker-compose.ove.yml down
```

To clean-up the Docker runtime first stop any active instances and then run:

```sh
docker system prune
docker volume prune
```

## Installation from source code

All OVE projects use a build system based on [Lerna](https://lernajs.io/). [**OVE Asset Services**](https://github.com/ove/ove-asset-services) are based on [.NET Core](https://github.com/dotnet/core). All other OVE projects are based on [Node.js](https://nodejs.org/en/), compiled with [Babel](http://babeljs.io/), and deployed on a [PM2](http://pm2.keymetrics.io/) runtime.

### Prerequisites

* [git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/) (v8.0+)
* [NPM](https://www.npmjs.com/)
* [NPX](https://www.npmjs.com/package/npx) (install with the command: `npm install -global npx`)
* [PM2](http://pm2.keymetrics.io/) (install with the command: `npm install -global pm2`)
* [Lerna](https://lernajs.io/) (install with the command: `npm install -global lerna`)

Compiling source code for the Docker environment also requires:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

Building [**OVE Asset Services**](https://github.com/ove/ove-asset-services) also requires:

* [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core/2.1)
* [NetVips](https://github.com/kleisauke/net-vips)
* [MariaDB](https://mariadb.org/)
* [S3](https://aws.amazon.com/s3/) or an [S3-compatible object storage](http://www.s3-client.com/s3-compatible-storage-solutions.html) such as [Minio](https://www.minio.io/)

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

Once the source code has been downloaded OVE can be installed either on a local Node.js environment (such as PM2's Node.js environment) or within a Docker environment. The two approaches are explained below.

### Compiling source code for a local Node.js environment

Once you have cloned or downloaded the code, OVE can be compiled using the [Lerna](https://lernajs.io/) build system:

```sh
cd ove
lerna bootstrap --hoist
lerna run clean
lerna run build
lerna run test
```

Instructions above are only provided for the [**OVE Core**](https://github.com/ove/ove) repository. The steps to follow are similar for other repositories.

#### Starting and stopping OVE using the PM2 process manager

The SVG app requires an instance of [Tuoris](https://github.com/fvictor/tuoris) to be available before starting it. To start Tuoris run:

```sh
pm2 start index.js -f -n "tuoris" -- -p PORT -i 1
```

OVE can then be started using the PM2 process manager by running:

```sh
OVE_HOST="OVE_CORE_HOST:PORT" TUORIS_HOST="TUORIS_HOST:PORT" pm2 start pm2.json
```

By default, OVE core and all services run on `localhost`, which should be used in place of `OVE_CORE_HOST` and `TUORIS_HOST` names above. The default `PORT` numbers for OVE core and Tuoris are provided in the [Running OVE](#running-ove) section.

Once the services have started, you can check their status by running:

```sh
pm2 status
```

Then, to check logs of all services, run:

```sh
pm2 logs
```

To stop OVE processes managed by PM2 run:

```sh
pm2 stop pm2.json
```

To clean-up the PM2 environment run:

```sh
pm2 delete pm2.json
```

### Compiling source code for a Docker environment

This approach currently works only for Linux and MacOS environments. The `build.sh` script corresponding to each repository can be found under the top most folder of the cloned or downloaded repository or within a `packages/PACKAGE_NAME` folder corresponding to each package.

The `build.sh` script can be executed as:

```sh
cd ove
./build.sh
```

Instructions above are only provided for the [**OVE Core**](https://github.com/ove/ove) repository. The steps to follow are similar for other repositories.

#### Starting and stopping the OVE Docker containers

Similar to the `build.sh` script, the `docker-compose.yml` file corresponding to each repository can also be found under the top most folder of the cloned or downloaded repository or within a `packages/PACKAGE_NAME` folder corresponding to each package.

The deployment environment needs to be [pre-configured](#configuring-the-environment) before running these scripts.

To start each individual docker container run:

```sh
SERVICE_VERSION="latest" docker-compose -f docker-compose.yml up -d
```

Once the services have started, you can check their status by running:

```sh
docker ps
```

The `ps` command will list containers along with their `CONTAINER_ID`. Then, to check logs of an individual container, run:

```sh
docker logs <CONTAINER_ID>
```

To stop each individual Docker container run:

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

For details of how to use OVE, see the [Usage](./USAGE.md) page.

After installation, OVE will expose several resources that can be accessed through a web browser:

* App Control page   `http://OVE_APP_HOST:PORT/control.html?oveSectionId=0`
* OVE client pages   `http://OVE_CORE_HOST:PORT/view.html?oveViewId=LocalNine-0`
  * (check [`Spaces.json`](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) for more information)
* OVE JS library     `http://OVE_CORE_HOST:PORT/ove.js`
* OVE API docs       `http://OVE_CORE_HOST:PORT/api-docs`

By default, OVE core, all apps, and all services run on `localhost`, which should be used in place of `OVE_CORE_HOST` and `OVE_APP_HOST` names above. The default `PORT` numbers are:

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
