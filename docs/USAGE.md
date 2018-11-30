# Using OVE

There are several steps that must be performed in order to use OVE to control a display.

Before using OVE, you will need to install [**OVE Core**](https://github.com/ove/ove), any [**OVE Apps**](https://github.com/ove/ove-apps), and any [**OVE Services**](https://github.com/ove/ove-services) that you intend to use. Installation guidelines can be found in the [OVE Installation Guide](./INSTALLATION.md).

## Setting up OVE

By default, OVE provides two `spaces`, that are useful for trying out some of the [**OVE Apps**](https://github.com/ove/ove-apps) with sample content. These are:

* `LocalNine` - This `space` contains nine `clients` arranged in `3 x 3` configuration. Each `client` has a dimension of `1440 x 808` pixels and the total `space` has a dimension of `4320 x 2424` pixels.
* `LocalFour` - This `space` contains four `clients` arranged in `2 x 2` configuration. Each `client` has a dimension of `1440 x 808` pixels and the total `space` has a dimension of `2880 x 1616` pixels.

You will need to modify the [`Spaces.json`](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) file and introduce a new `space` in OVE, before it can be used in a production setting.

## Launching browsers

In order to use OVE, you will need to open the URLs of the `clients` in a web browser. Each URL has the form: `http://OVE_CORE_HOST:PORT/view.html?oveViewId={SPACE}-{ID}`. The values for `OVE_CORE_HOST` and `PORT` must be set as explained in the [OVE Installation Guide](./INSTALLATION.md#running-ove). The value for `SPACE` would be the name of the `space` used, such as `LocalNine`, `LocalFour`, or a name of a new `space` that has been defined in the [`Spaces.json`](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) file. The value for `ID` is the index of the `client` associated with the browser window, in the definition of the `space` in [`Spaces.json`](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) file.

It is recommended to use OVE with Google Chrome, as this is the web browser used for development and in production at the [Data Science Institute](http://www.imperial.ac.uk/data-science/). However, it should also be compatible with other modern web browsers: if you encounter any browser-specific bugs please [report them as an Issue](https://github.com/ove/ove-apps/issues).

To test OVE functionality, you can simply open four web browser windows (or tabs) with the following URLs to create the `LocalFour` space:

```text
http://OVE_CORE_HOST:PORT/view.html?oveViewId=LocalFour-0
http://OVE_CORE_HOST:PORT/view.html?oveViewId=LocalFour-1
http://OVE_CORE_HOST:PORT/view.html?oveViewId=LocalFour-2
http://OVE_CORE_HOST:PORT/view.html?oveViewId=LocalFour-3
```

However, in a much larger OVE installation with many monitors, opening browser windows may be sufficiently time-consuming for automation to be worthwhile.

In a Windows environment, a [PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/powershell-scripting) script can be used to launch full-screen browsers with the correct URLs. In a Linux or MacOS environment, a [Bash](https://linux.die.net/man/1/bash) script can be used to launch full-screen browsers with the correct URLs. In a MacOS environment, [AppleScript](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html) can be used as an alternative to [Bash](https://linux.die.net/man/1/bash).

## Launching OVE Apps

OVE provides three different ways of launching apps into an OVE environment:

* Using [**OVE Editor**](https://github.com/ove/ove-editor)
* Using [**OVE SDKs**](https://github.com/ove/ove-sdks)
* Using [**OVE Core**](https://github.com/ove/ove) APIs

The [**OVE Editor**](https://github.com/ove/ove-editor) is designed to be used by the most basic users of OVE. The [**OVE Core**](https://github.com/ove/ove) APIs are intended to be used by the most advanced users of OVE.

Given below are instructions on how to load sample content using the [Image App](https://github.com/ove/ove-apps/tree/master/packages/ove-app-images). A complete list of all apps and similar instructions on how to use them can be found in the [**OVE Apps**](https://github.com/ove/ove-apps) repository.

### Launching OVE Apps from the OVE Editor

The [**OVE Editor**](https://github.com/ove/ove-editor) is still work in progress, and is not currently available as an option.

### Launching OVE Apps using the Python Client Library

The [Python Client Library](https://github.com/ove/ove-sdks/tree/master/python) (installation instructions available on GitHub repository) is one of the SDKs provided by OVE. To launch the [Image App](https://github.com/ove/ove-apps/tree/master/packages/ove-app-images) with a sample image, in the `LocalNine` space, run:

```python
from ove.config import local_space as space

space.enable_online_mode()

space.delete_sections()

image = space.add_section(w=4320, h=2424, x=0, y=0, app_type='images')
image.set_url("https://farm4.staticflickr.com/3107/2431422903_632ce51b56_o_d.jpg", "shelley")
```

### Launching OVE Apps using OVE Core APIs

OVE provides a number of useful APIs that can be used to launch applications and load content. The complete list of APIs provided by [**OVE Core**](https://github.com/ove/ove) is documented at: `http://OVE_CORE_HOST:PORT/api-docs`.

OVE core, all apps, and all services use [Swagger](https://swagger.io/solutions/api-documentation/) to document these APIs, which makes it possible to directly invoke them from within the documentation page (`http://OVE_CORE_HOST:PORT/api-docs`) opened on a web browser. A standalone tool such as [curl](https://curl.haxx.se/docs/manpage.html) can be used as an alternative to the [Swagger](https://swagger.io/solutions/api-documentation/) UI.

An image can be loaded into the `LocalFour` space using the OVE APIs, by running the following commands using [curl](https://curl.haxx.se/docs/manpage.html).

Linux/Mac:

```sh
curl --header "Content-Type: application/json" --request DELETE http://OVE_CORE_HOST:PORT/section
curl --header "Content-Type: application/json" --request POST --data '{"app": {"url": "http://OVE_APP_IMAGES_HOST:PORT","states": {"load": {"tileSources": "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi"}}}, "space": "LocalFour", "h": 500, "w": 500, "y": 0, "x": 0}' http://OVE_CORE_HOST:PORT/section
```

Windows:

```sh
curl --header "Content-Type: application/json" --request DELETE http://OVE_CORE_HOST:PORT/section
curl --header "Content-Type: application/json" --request POST --data "{\"app\": {\"url\": \"http://OVE_APP_IMAGES_HOST:PORT\", \"states\": {\"load\": {\"tileSources\": \"https://openseadragon.github.io/example-images/highsmith/highsmith.dzi\"}}}, \"space\": \"LocalFour\", \"h\": 500, \"w\": 500, \"y\": 0, \"x\": 0}" http://OVE_CORE_HOST:PORT/section
```

These commands clear all sections on OVE, and creates a new section with an instance of the [Image App](https://github.com/ove/ove-apps/tree/master/packages/ove-app-images) running within it. In this example we are loading an image with a [Deep Zoom](https://docs.microsoft.com/en-us/previous-versions/windows/silverlight/dotnet-windows-silverlight/cc645077(v=vs.95)) file format.

## Controlling OVE Apps and designing interactive visualisations

Once an App has been loaded into an OVE `space` it can be controlled using the corresponding controller, that provides app-specific functionality. The controller of the [Image App](https://github.com/ove/ove-apps/tree/master/packages/ove-app-images) supports panning and zooming of images that have been loaded. The controller can be loaded into a separate browser window by accessing the URL `http://OVE_APP_IMAGES_HOST:PORT/control.html?oveSectionId=0`.

A common practice when designing projects with interactive visualisations is to create a custom launcher application that is capable of making API calls. Such applications are usually designed to run on web browsers and invoke [**OVE Core**](https://github.com/ove/ove) API using JavaScript code. These applications eliminate the need of manual intervention and automate the launching and controlling of OVE apps, providing a single-click (or single-touch) experience.

When designing content to be displayed in an OVE environment, please also be aware of the [potential pitfalls](./PITFALLS.md).
