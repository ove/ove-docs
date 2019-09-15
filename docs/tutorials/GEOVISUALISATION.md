# Geovisualisation

The rich set of features provided by the [Maps App](../../ove-apps/packages/ove-app-maps/README.md) makes it very easy to OVE to visualise geospatial data. In this tutorial we will learn how to visualise some of the open data in the geospatial domain using OVE.

## Step 1: Installing OVE

Before starting the tutorial, we need an installation of OVE. If you already have an OVE installation and would like to use that, please proceed to the [next step](#step-2-installing-other-prerequisites).

For this tutorial, it is sufficient to install OVE into a [Docker](https://www.docker.com/get-started) environment. To install OVE, we need the following prerequisites:

* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)

Docker is available in two versions: a free Community Edition (CE), and an Enterprise Edition (EE) that includes commercial support. The Community Edition should be sufficient for most users of OVE, and can be installed by following the instructions for [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/), [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/) or [Docker CE for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/). If you are using a version of Windows or Mac OS that does not meet the requirements listed for the Docker Desktop installer (either because it is too old, or because it is the Home edition of Windows, rather than Pro, Enterprise or Education), you should instead install the legacy [Docker Toolbox](https://docs.docker.com/toolbox/overview/).

After installing the prerequisites, OVE can then installed by downloading the specific installation script from the list below:

* [linux-python3-v0.4.0-setup](https://github.com/ove/ove-install/releases/download/v0.4.0/linux-python2-v0.4.0-setup)
* [linux-python2-v0.4.0-setup](https://github.com/ove/ove-install/releases/download/v0.4.0/linux-python2-v0.4.0-setup)
* [osx-python3-v0.4.0-setup](https://github.com/ove/ove-install/releases/download/v0.4.0/osx-python3-v0.4.0-setup)
* [osx-python2-v0.4.0-setup](https://github.com/ove/ove-install/releases/download/v0.4.0/osx-python2-v0.4.0-setup)
* [windows-python3-v0.4.0-setup.exe](https://github.com/ove/ove-install/releases/download/v0.4.0/windows-python3-v0.4.0-setup.exe)
* [windows-python2-v0.4.0-setup.exe](https://github.com/ove/ove-install/releases/download/v0.4.0/windows-python2-v0.4.0-setup.exe)

Once downloaded, the installation script may not be executable on Linux and Mac operating systems. As a resolution, run the following command:

```sh
chmod u+x *-setup
```

Running the executable will start the step-by-step installation process. For unsupported platforms or to change port numbers and for additional information, please refer the [OVE installation guide](../../docs/INSTALLATION.md).

Once installed, start OVE by running the commands suggested by the installer:

```sh
docker-compose -f docker-compose.setup.ove.yml up -d
```

## Step 2: Installing other prerequisites

For this tutorial, we will also need the following prerequisites:

* [git](https://git-scm.com/downloads)
* [Python](https://www.python.org/)

Once you have installed them, please clone the [**OVE Tutorials**](https://github.com/ove/ove-tutorials/) repository by running the following on a command line:

```sh
git clone https://github.com/ove/ove-tutorials
cd ove-tutorials
```

## Step 3: Generate the Map Configuration files with your IP

First of all, you need to find your IP address. This can be done by running the following on a command line (within the `ove-tutorials` directory):

```sh
python -m getIP
```

If you are unable to run the above command, please check if you have installed [Python](https://www.python.org/) and also added it to your `PATH`, which is provided as an option in some installers. If you have successfully installed [Python](https://www.python.org/), check if you are in the `ove-tutorials` directory. If the command does not work for any other reason, you can run `ifconfig` or `ipconfig` and find your IP address.

We then need to change directory to `geovisualisation`. All the files that we will be using in this tutorial can be found inside this directory.

```sh
cd geovisualisation
```

Within this directory, you will find two [GeoJSON](http://geojson.org/) files, `hampshireCrime.json` and `hampshireRoads.json` as well as two OVE `Map Configuration` files, `crime_map_config_original.json` and `roads_map_config_original.json`. You will also find several [Python](https://www.python.org/) scripts.

The IP addresses of the OVE `Map Configuration` files can be replaced by running a python script. Please replace `<IP>` with your IP address (that you identified by running the instructions above). To change the IP addresses of the OVE `Map Configuration` files run the following on a command line:

```sh
python -m fixIP <IP>
```

This will generate two new OVE `Map Configuration` files, `crime_map_config.json` and `roads_map_config.json`. You will find that these new files have your IP address instead of `localhost` in the originals. You can run the above script more than once, if your IP address changes over time. Running the script more than once will regenerate these files.

If the script fails to execute for any reason, simply make copies of the originals and replace `localhost` with your IP address in the copies.

## Step 4: Host the Geospatial data and Map Configurations

Before launching the application you will need to host the content that you plan to load. In this demo, we will be hosting the [GeoJSON](http://geojson.org/) files, `hampshireCrime.json` and `hampshireRoads.json` as well as the two OVE `Map Configuration` files that we generated in the [previous step](#step-3-generate-the-map-configuration-files-with-your-ip), `crime_map_config.json` and `roads_map_config.json`. This can be done by running the following on a command line (within the `geovisualisation` directory):

```sh
python -m server
```

This will start a simple web server on your computer on port 8000. If everything works well, you should see the `Serving HTTP on 0.0.0.0 port 8000 ...` line printed on your command line. If you are unable to use this port, simply run the following command to use another port.

```sh
python -m server <PORT>
```

Please also remember to replace the port numbers on the `crime_map_config.json` and `roads_map_config.json` files to match the new port number if you are not using port 8000.

You can stop the server by interrupting it using `ctrl+c` on your keyboard. We need to keep the server running before we can proceed to the [next step](#step-5-launching-map-configurations).

## Step 5: Launching Map Configurations

In this step we will be using the [Launcher UI](../../ove-ui/packages/ove-ui-launcher/README.md) to launch each map configuration into the OVE environment. This UI can be accessed by opening the [`http://localhost:8080/ui/launcher`](http://localhost:8080/ui/launcher) URL on a web browser. If you changed the port numbers when installing OVE, you will need to replace `8080` with the corresponding port number. If you did not install OVE locally, you will need to replace `localhost:8080` with the `OVE_CORE_HOST:PORT` combination corresponding to a remote OVE installation.

If the [Launcher UI](../../ove-ui/packages/ove-ui-launcher/README.md) does not load, please note that you may need to restart [Docker](https://www.docker.com/get-started) and relaunch OVE by running the commands suggested by the installer if the IP address has changed on your local installation. You will find that the [Launcher UI](../../ove-ui/packages/ove-ui-launcher/README.md) does not load until you do this additional step. This does not apply for remote OVE installations, in which case you will need to contact your systems administrator.

Once the [Launcher UI](../../ove-ui/packages/ove-ui-launcher/README.md) has loaded follow the steps below.

* Step 1: select the **`Maps`** application.
* Step 2: use the **`LocalNine`** space with x: **`0`**, y: **`0`**, w: **`4320`**, h: **`2424`** (please type these in). If you are using the remote OVE installation or if you have configured other spaces, please select your space of choice and change `w` and `h` to their maximum values.
* Step 3: select the **`New state configuration`** mode and set the Asset URL to one of **`http://YOUR_IP:8000/roads_map_config.json`** or **`http://YOUR_IP:8000/crime_map_config.json`**. Replace `YOUR_IP` with your IP address.
* Step 4: delete existing sections and open the controller (i.e. **`Yes`** and **`Yes`**).
* Step 5: press **`Launch`**.

This will launch the controller of the [Maps App](../../ove-apps/packages/ove-app-maps/README.md). Please note that the controller may not automatically launch if you have any pop-up blockers on your web browser.

At this point, only the base layer will be selected in the controller. To see the vector overlays, add **`&layers=0,1`** to the URL and reload the page. You will then see some highlighted roads or some crime hotspots near the city of Southampton in UK.

You can repeat this step if your map configuration has changed or if you want to launch the application on another space or to alter the dimensions. It may be easier to keep pressing `Previous` on the [Launcher UI](../../ove-ui/packages/ove-ui-launcher/README.md) until you reach the desired step to avoid having to repeat all the steps. You can now proceed to the [next step](#step-6-viewing-results-on-ove), which is also the last step in this tutorial.

## Step 6: Viewing results on OVE

The last step will be to view the results on OVE. If you are using a remote OVE installation, it is most likely the the viewers would already be loaded, and you can skip this step.

If you have installed locally, you will need to explicitly launch the **`LocalNine`** space (or another space that you selected previously). Open the [`http://localhost:8080`](http://localhost:8080) URL to visit the OVE landing page. If you changed the port numbers when installing OVE, you will need to replace `8080` with the corresponding port number. Navigate to find the space you are interested in and open the URLs noted under `The OVE Clients corresponding to this space have the URLs`. If you selected the **`LocalNine`** space, you will have to open 9 URLs in total.

As an alternative to launching an entire space, you could also preview it by selecting the `Preview` option found in front of the name of space on the OVE landing page. This will launch a single page preview of the space.

Please allow 15 - 20 seconds for your space (or its preview) to display the map for the first time. You will find that the map loads much faster subsequently.

You now can repeat the [previous step](#step-5-launching-map-configurations) to switch between the two sample datasets that are provided in this tutorial.

## Bonus Step: Previewing [Airbnb](https://www.airbnb.com/) data from Boston

In this bonus step, we will learn how to work with public datasets. We will be using a sample dataset provided by [kaggle](https://www.kaggle.com/datasets). We will be looking at the [Airbnb Listings from Boston](https://www.kaggle.com/airbnb/boston#listings.csv). To start, download [listings](https://www.kaggle.com/airbnb/boston/downloads/listings.csv/1). You may need an account on [kaggle](https://www.kaggle.com) to download this file.

Extract the downloaded zip archive and copy the `listings.csv` to the `geovisualisation` directory.

Then, run the following on a command line to generate a [GeoJSON](http://geojson.org/) file for these listings:

```sh
python -m pip install -r requirements.txt
python -m convert
```

The script above is capable of producing [GeoJSON](http://geojson.org/) files from any CSV files. To convert another file simply modify the `convert.py` script. You could also convert a file at another location by running:

```sh
python -m pip install -r requirements.txt
python -m convert <file_path.csv>
```

Make a copy of the `crime_map_config.json` as `listings_map_config.json` by running:

```sh
cp crime_map_config.json listings_map_config.json
```

Edit the `listings_map_config.json` file using your favourite text editor. Replace `hampshireCrime.json` with `listings.json` and `["-157081.37129179656", "6606026.977066623"]` with `["-7909957.677026466", "5214901.036122"]`. This will make our map point at suburban Boston instead of Southampton and display [Airbnb](https://www.airbnb.com/) listings instead of crime data. We will only be displaying listings that are of type `Entire home/apt`. This can be changed by modifying the `convert.py` script.

Now you can re-run [Step 5](#step-5-launching-map-configurations) and launch the application with the **`http://YOUR_IP:8000/listings_map_config.json`** asset URL. Replace `YOUR_IP` with your IP address. You can zoom and pan the map using the controller of the [Maps App](../../ove-apps/packages/ove-app-maps/README.md) to explore the dataset. You will be able to observe interesting trends such as the areas where [Airbnb](https://www.airbnb.com/) is popular and areas where it is not.

## Summary

In this tutorial we learned how to use [OVE](https://github.com/ove/ove) for geovisualisation. We explored two datasets `hampshireCrime.json` and `hampshireRoads.json`. The bonus step looks at some Open Data from [kaggle](https://www.kaggle.com/datasets).

You can modify the `convert.py` script to convert other CSV files into [GeoJSON](http://geojson.org/), or download [GeoJSON](http://geojson.org/) files from [kaggle](https://www.kaggle.com/datasets) and other sources, or use other data formats such as [TopoJSON](https://github.com/topojson), [GML](https://www.opengeospatial.org/standards/gml), [KML](https://www.opengeospatial.org/standards/kml), [WKT CRS](https://www.opengeospatial.org/standards/wkt-crs), [OSM](https://wiki.openstreetmap.org/wiki/OSM_XML), [IGC](http://istitutogeograficocentrale.it/en/) or [Esri](https://www.esri.com). You can also convert these other formats into [GeoJSON](http://geojson.org/).

The `hampshireCrime.json` was produced using a modified version of the `convert.py` script to convert the CSV file downloaded from [DATA.POLICE.UK](https://data.police.uk/data/). We used the data for the month of `August 2016` from the `Hampshire Constabulary` and filtered the results to include crimes of type `Criminal damage and arson`. The `hampshireRoads.json` was produced by converting the [OSM](https://wiki.openstreetmap.org/wiki/OSM_XML) file from [Geofabrik](https://download.geofabrik.de/europe/great-britain/england/hampshire.html) using the [osmtogeojson](https://tyrasd.github.io/osmtogeojson/) command line tool.

The `crime_map_config.json` provides an example on using the [Leaflet](https://leafletjs.com/) configuration module while the `roads_map_config.json` provides an example on using the [OpenLayers](https://openlayers.org/) configuration model. The [Maps App](../../ove-apps/packages/ove-app-maps/README.md) will automatically select the appropriate library to suit the configuration model you choose. For more advanced configurations, to change the base map, or to use more than one vector overlay refer to the documentation of the OVE [Maps App](../../ove-apps/packages/ove-app-maps/README.md).
