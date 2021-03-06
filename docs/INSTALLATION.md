# Installing OVE

OVE needs to be installed before it can be used to control a display. OVE can be installed either by downloading and compiling the source code of the corresponding components or by running a specific installer available on the [**OVE Install**](https://github.com/ove/ove-install/) repository.

All contributors to OVE are encouraged to download and compile the source code. All users of OVE are encouraged to use the OVE installers.

Please refer the [OVE Asset Manager installation guide](../ove-asset-manager/docs/Install.md) to install the OVE Asset Manager.

## Installation by running OVE installers

[**OVE Install**](https://github.com/ove/ove-install/) scripts are designed to install OVE into a [Docker](https://www.docker.com/get-started) environment.

### Prerequisites

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

Docker is available in two versions: a free Community Edition (CE), and an Enterprise Edition (EE) that includes commercial support. The Community Edition should be sufficient for most users of OVE, and can be installed by following the instructions for [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/), [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/) or [Docker CE for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/). If you are using a version of Windows or Mac OS that does not meet the requirements listed for the Docker Desktop installer (either because it is too old, or because it is the Home edition of Windows, rather than Pro, Enterprise or Education), you should instead install the legacy [Docker Toolbox](https://docs.docker.com/toolbox/overview/).

Building installers for non-supported platforms also requires:

* [git](https://git-scm.com/downloads)
* [Python](https://www.python.org/)

### Downloading the OVE installers

The [**OVE Install**](https://github.com/ove/ove-install/) scripts are available for Linux, Mac (OS X) and Windows operating systems either as a Python 3 or a Python 2 executable application:

* [linux-python3-v0.5.0-setup](https://github.com/ove/ove-install/releases/download/v0.5.0/linux-python2-v0.5.0-setup)
* [linux-python2-v0.5.0-setup](https://github.com/ove/ove-install/releases/download/v0.5.0/linux-python2-v0.5.0-setup)
* [osx-python3-v0.5.0-setup](https://github.com/ove/ove-install/releases/download/v0.5.0/osx-python3-v0.5.0-setup)
* [osx-python2-v0.5.0-setup](https://github.com/ove/ove-install/releases/download/v0.5.0/osx-python2-v0.5.0-setup)
* [windows-python3-v0.5.0-setup.exe](https://github.com/ove/ove-install/releases/download/v0.5.0/windows-python3-v0.5.0-setup.exe)
* [windows-python2-v0.5.0-setup.exe](https://github.com/ove/ove-install/releases/download/v0.5.0/windows-python2-v0.5.0-setup.exe)

### Building installers for non-supported platforms

[**OVE Install**](https://github.com/ove/ove-install/) provides tools for building the `setup` script for non-supported platforms. The `master` branch of [**OVE Install**](https://github.com/ove/ove-install/) needs to be cloned in order to proceed:

```sh
git clone https://github.com/ove/ove-install
cd ove-install
```

Refer the [guidelines on developing/building a single setup file](https://github.com/ove/ove-install/blob/master/README.md#developingbuilding-a-single-setup-file) for detailed setup instructions.

### Running the installers

Once downloaded, the installation script may not be executable on Linux and Mac operating systems. As a resolution, run the following command:

```sh
chmod u+x *-setup
```

Running the executable will start the step-by-step installation process. This will configure the details of the deployment environment such as hostname, port numbers and environment variables.

The ports are pre-configured to a list of common defaults, but can be changed based on end-user requirements. Each port or port-range is defined as a mapping `HOST_PORT:CONTAINER_PORT`. Only the host ports can be changed, and it is important to note that **container ports must not be changed**.

Each installer is capable of installing the current stable, latest unstable or a previous stable version.

#### Resolving port conflicts

Once the `docker-compose.setup.ove.yml` file is generated, it is important to ensure all `HOST_PORT` values defined on the `docker-compose.setup.ove.yml` file are not currently in use. If this is not the case, corresponding `HOST_PORT` values need to be changed. For example, if another [Tuoris](https://github.com/fvictor/tuoris) instance exists on the host machine, it is most likely that the port `7080` could be in use. In such a situation, the [Tuoris](https://github.com/fvictor/tuoris) `HOST_PORT` needs to be changed on the `docker-compose.setup.ove.yml` file.

#### Environment variables

Please note that the references to `Hostname (or IP address)` noted below should not be replaced with `localhost`, or the Docker hostname because these services need to be accessible from the client/browser. Please replace it with the `public hostname` or `IP address` of the `host machine`. For a local installation, the `host machine` refers to your own computer. For a server installation the `host machine` refers to the server on which the Docker environment has been setup. The default `PORT` numbers for OVE core, [Tuoris](https://github.com/fvictor/tuoris), [OpenVidu](https://openvidu.io/), and other services are provided in the [Running OVE](#running-ove) section.

Before starting up OVE you must configure the environment variables either by providing them during the installation process or by editing the generated `docker-compose.setup.ove.yml` file. The environment variables that can be configured are:

* `OVE_HOST` - Hostname (or IP address) + port of OVE core
* `TUORIS_HOST` - Hostname (or IP address) + port of the [Tuoris](https://github.com/fvictor/tuoris) service (dependency of [SVG App](../ove-apps/packages/ove-app-svg/README.md)).
* `OPENVIDU_HOST` - Hostname (or IP address) + port of the [OpenVidu](https://openvidu.io/) service (dependency of [WebRTC App](../ove-apps/packages/ove-app-webrtc/README.md)).
* `openvidu.publicurl` - `https://` + Hostname (or IP address) + port of the [OpenVidu](https://openvidu.io/) service (dependency of [WebRTC App](../ove-apps/packages/ove-app-webrtc/README.md)).
* `OPENVIDU_SECRET` - The [OpenVidu](https://openvidu.io/) secret. Must match `openvidu.secret` configured below.
* `openvidu.secret` - The [OpenVidu](https://openvidu.io/) secret. Must match `OPENVIDU_SECRET` configured above.
* `OVE_SPACES_JSON` - This variable is optional and not defined in the `docker-compose.setup.ove.yml` by default. This accepts a URL for the [`Spaces.json` file](SPACES_JSON.md) to be used as a replacement to the default (embedded) [`Spaces.json` file](SPACES_JSON.md) available with OVE.
* `LOG_LEVEL` - This variable is optional and not defined in the `docker-compose.setup.ove.yml` by default. This can have values from `0` to `6` and defaults to `5`. The values correspond to:
  * `0` - FATAL
  * `1` - ERROR
  * `2` - WARN (The recommended `LOG_LEVEL` for production deployments)
  * `3` - INFO
  * `4` - DEBUG
  * `5` - TRACE
  * `6` - TRACE_SERVER (Generates additional server-side `TRACE` logs)
* `OVE_PERSISTENCE_SYNC_INTERVAL` - This variable is optional and not defined in the `docker-compose.setup.ove.yml` by default. This accepts an interval (in milliseconds) for synchronising an instance of OVE or of an OVE application with a registered persistence service. This optional variable can be set individually for OVE core and for all OVE applications. The default value is `2000`.
* `OVE_CLOCK_SYNC_ATTEMPTS` - This variable is optional and not defined in the `docker-compose.setup.ove.yml` by default. This accepts a number of attempts made by each OVE client before it requests the server to synchronise its clock. The default value is `5`. If this value is set to `0`, the synchronisation process will not take place. Changing the value will increase or reduce the accuracy of the detections.
* `OVE_CLOCK_SYNC_INTERVAL` - This variable is optional and not defined in the `docker-compose.setup.ove.yml` by default. This accepts an interval (in milliseconds) for running the synchronisation algorithm. The default value is `120000` (2 minutes).
* `OVE_CLOCK_RE_SYNC_INTERVAL` - This variable is optional and not defined in the `docker-compose.setup.ove.yml` by default. This accepts an interval (in milliseconds) for requesting all clients to re-synchronise their clocks. It is entirely up to the client to decide whether they want to re-sync or not. The default value is `3600000` (1 hour).
* `OVE_<APP_NAME_IN_UPPERCASE>_CONFIG_JSON` - This variable is optional and not defined in the `docker-compose.setup.ove.yml` by default. This accepts a path to an application-specific `config.json` file. This optional variable is useful when application-specific configuration files are provided at alternative locations on a filesystem (such as when [using Docker secrets](https://docs.docker.com/engine/swarm/secrets/)). `<APP_NAME_IN_UPPERCASE>` must be replaced with the name of the application in upper-case. For example, the corresponding environment variable for the [Networks App](../ove-apps/packages/ove-app-networks/README.md) would be `OVE_NETWORKS_CONFIG_JSON`.
* `OVE_MAPS_LAYERS` - This variable is optional and not defined in the `docker-compose.setup.ove.yml` by default. This accepts a URL of a file containing the [Map layers Configuration](../ove-apps/packages/ove-app-maps/docs/MAP_LAYERS_JSON.md) in a JSON format and overrides the [default Map layers Configuration](../ove-apps/packages/ove-app-maps/docs/MAP_LAYERS_JSON.md) of the [Maps App](../ove-apps/packages/ove-app-maps/README.md).

The [OpenVidu](https://openvidu.io/) server also accepts several other optional environment variables that are not defined in the `docker-compose.setup.ove.yml` by default. These are explained in the documentation on [OpenVidu server configuration parameters](https://openvidu.io/docs/reference-docs/openvidu-server-params/).

#### Other configuration files

Few other configuration files can be found inside the `config` directory that is auto generated along with the `docker-compose.setup.ove.yml` file:

* [`Spaces.json`](SPACES_JSON.md) - The default (embedded) `spaces` configuration of OVE can be modified prior to the initial start-up of OVE. To learn more, please refer the [documentation on `Spaces.json`](SPACES_JSON.md).

#### Using your own certificates for [OpenVidu](https://openvidu.io/)

[OpenVidu](https://openvidu.io/) is a prerequisite for using the [WebRTC App](https://ove.readthedocs.io/en/stable/ove-apps/packages/ove-app-webrtc/README.html). [OpenVidu](https://openvidu.io/) uses secure WebSockets and uses certificates. And, unless you provide your own certificate, it will use a self-signed certificate which will become inconvenient when loading the [WebRTC App](https://ove.readthedocs.io/en/stable/ove-apps/packages/ove-app-webrtc/README.html) on multiple web browsers.

You can run [OpenVidu](https://openvidu.io/) with your own certificate by first creating new [Java Key Store](https://docs.oracle.com/en/java/javase/11/tools/keytool.html#GUID-5990A2E4-78E3-47B7-AE75-6D1826259549__GUID-911FFF69-6916-4C69-8A93-66A13E4A239C) following [the OpenVidu guide on using your own certificate](https://openvidu.io/docs/deployment/deploying-ubuntu/#using-your-own-certificate). This will subsequently require the following changes in the auto generated `docker-compose.setup.ove.yml` file:

```yaml
version: '3.1'
services:
  ...

  openvidu-openvidu-call:
    image: openvidu/openvidu-call:latest
    restart: unless-stopped
    ports:
    - "4443:4443"
    environment:
      openvidu.secret: "MY_SECRET"
      openvidu.publicurl: "https://<Hostname (or IP address)>:4443"
      server.ssl.key-store: /run/secrets/openvidu.jks
      server.ssl.key-store-password: "openvidu"
      server.ssl.key-alias: "openvidu"
    secrets:
      - openvidu.jks

  ...

secrets:
  openvidu.jks:
    file: openvidu.jks
```

To add a trusted CA certificate (`trusted_ca.cer`) to your [Java Key Store](https://docs.oracle.com/en/java/javase/11/tools/keytool.html#GUID-5990A2E4-78E3-47B7-AE75-6D1826259549__GUID-911FFF69-6916-4C69-8A93-66A13E4A239C), run:

```sh
keytool -import -v -trustcacerts -alias root -file trusted_ca.cer -keystore openvidu.jks -keypass openvidu
 ```

### Starting and stopping the OVE Docker applications

OVE provides separate installation scripts to help users install the necessary components. To install and start OVE on Docker run:

```sh
docker-compose -f docker-compose.setup.ove.yml up -d
```

Please note that the OVE UI components are re-built when the respective docker container is started for the first time, which may result in them take a bit longer than expected to start. [nginx](https://www.nginx.com/) will display a `502 Bad Gateway` status while the OVE UI components are built and started up for the first time. If you see this status message, please give the system 5 - 30 minutes to complete the installation. A working internet connection is also a must for this initial installation process.

If you wish to install OVE without it automatically starting, use the command:

```sh
docker-compose -f docker-compose.setup.ove.yml up --no-start
```

Once the installation procedure has completed and OVE has been started, the successful installation of OVE can be verified by accessing the OVE home page (located at: `http://OVE_CORE_HOST:PORT` as noted in the [Running OVE](#running-ove) section) using a web browser.

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
docker-compose -f docker-compose.setup.ove.yml down
```

To clean-up the Docker runtime first stop any active instances and then run:

```sh
docker system prune
docker volume prune
```

## Installation from source code

All OVE projects use a build system based on [Lerna](https://lernajs.io/). Most OVE projects are based on [Node.js](https://nodejs.org/en/), compiled with [Babel](http://babeljs.io/), and deployed on a [PM2](http://pm2.keymetrics.io/) runtime. Some OVE projects are based on [Python](https://www.python.org/).

### Prerequisites

* [git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/) (v8.0+) ([NPM](https://www.npmjs.com/) is also required, but is included with the Node.js installer)
* [NPX](https://www.npmjs.com/package/npx) (install with the command: `npm install -global npx`)
* [PM2](http://pm2.keymetrics.io/) (install with the command: `npm install -global pm2`)
* [Lerna](https://lernajs.io/) (install with the command: `npm install -global lerna`)
* [nginx](https://nginx.org/en/download.html)

Compiling source code for the Docker environment also requires:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

The [SVG App](../ove-apps/packages/ove-app-svg/README.md) requires:

* [Tuoris](https://github.com/fvictor/tuoris) (installation instructions available on GitHub repository)

The [WebRTC App](../ove-apps/packages/ove-app-webrtc/README.md) requires:

* [OpenVidu](https://openvidu.io/)

### Downloading source code

All OVE projects can be downloaded from their GitHub repositories:

* OVE Core: [master](https://github.com/ove/ove) | [releases](https://github.com/ove/ove/releases)
* OVE Apps: [master](https://github.com/ove/ove-apps) | [releases](https://github.com/ove/ove-apps/releases)
* OVE Services: [master](https://github.com/ove/ove-services) | [releases](https://github.com/ove/ove-services/releases)
* OVE UIs: [master](https://github.com/ove/ove-ui) | [releases](https://github.com/ove/ove-ui/releases)
* OVE Asset Manager: [master](https://github.com/ove/ove-asset-manager) | [releases](https://github.com/ove/ove-asset-manager/releases)

The `master` branch of each repository contains the latest code, and can also be cloned if you intend to contribute code or fix issues:

```sh
git clone https://github.com/ove/ove
```

Once the source code has been downloaded OVE can be installed either on a local Node.js environment (such as PM2's Node.js environment) or within a Docker environment. The two approaches are explained below.

### Setting up local nginx installation

The OVE core, applications, services and UIs are made up of multiple microservices running on their own ports. The OVE Docker applications use [nginx](https://nginx.org/en/) to overcome the complexity of end-users having to expose multiple ports on their systems. Therefore, for a local OVE installation, having [nginx](https://nginx.org/en/) installed with the [OVE default configuration](https://github.com/ove/ove-docs/blob/master/resources/default.conf?raw=true) is recommended. This will ensure all URLs found in the documentation would work without any modification.

Replace `/etc/nginx/conf.d/default.conf` (which might be found in a different path depending on the OS) with the contents of the [OVE default configuration](https://github.com/ove/ove-docs/blob/master/resources/default.conf?raw=true). Restart [nginx](https://nginx.org/en/) if it is already running.

With this configuration, by default, OVE will run on port `80`. To run OVE on its standard port `8080`, change the server `listen` port in the [nginx](https://nginx.org/en/) configuration to `8080`. This will run into a port conflict with the OVE core microservice which also runs on port `8080` by default. To change the port allocated to OVE core microservice to `9080`, modify the `pm2.json` file found inside the git clone of OVE core by replacing `8080` with `9080`. Then change the `proxy_pass http://localhost:8080` line to `proxy_pass http://localhost:9080` in the [nginx](https://nginx.org/en/) configuration.

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

The [SVG App](../ove-apps/packages/ove-app-svg/README.md) requires an instance of [Tuoris](https://github.com/fvictor/tuoris) to be available before starting it. To start [Tuoris](https://github.com/fvictor/tuoris) run:

```sh
pm2 start index.js -f -n "tuoris" -- -p PORT -i 1
```

The [WebRTC App](../ove-apps/packages/ove-app-webrtc/README.md) requires an instance of [OpenVidu](https://openvidu.io/) to be available before starting it. To start [OpenVidu](https://openvidu.io/) run:

```sh
docker run -p 4443:4443 --rm -e openvidu.secret=MY_SECRET openvidu/openvidu-call:latest
```

OVE can then be started using the PM2 process manager. To start OVE on a Linux or MacOS environment run:

```sh
OVE_HOST="OVE_CORE_HOST:PORT" TUORIS_HOST="TUORIS_HOST:PORT" OPENVIDU_HOST="OPENVIDU_HOST:PORT" pm2 start pm2.json
```

To start OVE on a Windows environment run:

```sh
OVE_HOST="OVE_CORE_HOST:PORT" TUORIS_HOST="TUORIS_HOST:PORT" OPENVIDU_HOST="OPENVIDU_HOST:PORT" pm2 start pm2-windows.json
```

By default, OVE core and all services run on `localhost`, which should be used in place of `OVE_CORE_HOST` and `TUORIS_HOST` names above. The default `PORT` numbers for OVE core, [Tuoris](https://github.com/fvictor/tuoris) and [OpenVidu](https://openvidu.io/) are provided in the [Running OVE](#running-ove) section.

Once the services have started, you can check their status by running:

```sh
pm2 status
```

Then, to check logs of all services, run:

```sh
pm2 logs
```

To stop OVE processes managed by PM2 on a Linux or MacOS environment run:

```sh
pm2 stop pm2.json
```

To stop OVE processes managed by PM2 on a Windows environment run:

```sh
pm2 stop pm2-windows.json
```

To clean-up processes managed by PM2 on a Linux or MacOS environment run:

```sh
pm2 delete pm2.json
```

To clean-up processes managed by PM2 on a Windows environment run:

```sh
pm2 delete pm2-windows.json
```

#### Starting and stopping OVE UIs in Development

The OVE UI components are developed as [React](https://reactjs.org/) web applications. These components can therefore be launched in development mode, by running:

```sh
npm run start:dev
```

Once launched, they can be stopped by killing the application using the `Ctrl+C` keyboard shortcut.

Unless [OVE Core](https://github.com/ove/ove) and the OVE Apps are running on localhost on their default ports, you will also need to modify the configuration file `.env` appropriately.

### Compiling source code for a Docker environment

This approach currently works only for Linux and MacOS environments. The `build.sh` script corresponding to each repository can be found under the top most directory of the cloned or downloaded repository or within a `packages/PACKAGE_NAME` directory corresponding to each package.

The `build.sh` script can be executed as:

```sh
cd ove
./build.sh
```

Instructions above are only provided for the [**OVE Core**](https://github.com/ove/ove) repository. The steps to follow are similar for other repositories.

#### Starting and stopping the OVE Docker containers

Similar to the `build.sh` script, the `docker-compose.yml` file corresponding to each repository can also be found under the top most directory of the cloned or downloaded repository or within a `packages/PACKAGE_NAME` directory corresponding to each package.

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

It is recommended to use OVE with [Google Chrome](https://www.google.com/chrome/), as this is the web browser used for development and in production at the [Data Science Institute](http://www.imperial.ac.uk/data-science/). However, it should also be compatible with other modern web browsers: if you encounter any browser-specific bugs please [report them as an Issue](https://github.com/ove/ove-apps/issues).

For details of how to use OVE, see the [Usage](USAGE.md) page.

After installation, OVE will expose several resources that can be accessed through a web browser:

* OVE home page      `http://OVE_CORE_HOST:PORT`
* App control page   `http://OVE_CORE_HOST:PORT/app/OVE_APP_NAME/control.html?oveSectionId=0`
* OVE client pages   `http://OVE_CORE_HOST:PORT/view.html?oveViewId=LocalNine-0`
  * check [`Spaces.json`](SPACES_JSON.md) for more information
* OVE JS library     `http://OVE_CORE_HOST:PORT/ove.js`
* OVE API docs       `http://OVE_CORE_HOST:PORT/api-docs/`

By default, OVE core, all apps, and all services run on `localhost`, which should be used in place of `OVE_CORE_HOST` above.
Note that the docker container might be given a different IP address to the machine on which it is running; in this case, the hostname `localhost` will not work, and you should instead use the IP address printed by the command `docker-machine ip`.

The default `PORT` numbers are:

* 8080 - OVE Core
* 6060 - OVE Asset Manager UI
* 6080 - OVE Asset Manager API
* 6081 - OVE Asset Manager Read proxy
* 7080 - [Tuoris](https://github.com/fvictor/tuoris)
* 4443 - [OpenVidu](https://openvidu.io/)

