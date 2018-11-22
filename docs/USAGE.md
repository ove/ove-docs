# Using OVE

There are several steps that must be performed in order to use OVE to control a display.

## Running OVE-core and apps

You will need to install the [OVE core service](https://github.com/ove/ove) and any [OVE apps](https://github.com/ove/ove-apps) or [OVE Services](https://github.com/ove/ove-services) that you intend to use. Instructions for building and running these can be found in the corresponding README files.

You will need to modify the [pm2.json](https://github.com/ove/ove-apps/blob/master/pm2.json) (or, if you are using windows, the [pm2-windows.json](https://github.com/ove/ove-apps/blob/master/pm2-windows.json)) file for the OVE apps so that the ``OVE_HOST`` contains the  ``hostname:port`` on which the OVE core service is accessible. Note that this URL should be accessible by the computers controlling the monitors, so should not be ``localhost`` unless all monitors are attached to the machine running OVE core.

You will also need to modify the [``ove/packages/ove-core/src/client/Spaces.json``](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) file to define a new ``space`` in OVE core.

Note that all services need to hosted somewhere that is accessible from the computers connected to the monitors that will be used in the display.

## Creating content

When designing content to be displayed in an OVE environment, be aware of the [potential pitfalls](./PITFALLS.md).

## Launching browsers

On each monitor that makes up the display you will need to launch a browser window, and open the correct URL in each. This has the form: ``http://<ove-hostname>:<ove-port>/view.html?oveClientId=<space>-{id}``
where ``{id}`` is the index of the ``client`` associated with the browser window in the space's definition in ``Spaces.json``.

It is recommended to use Chrome as the browser, because that is what is primarily used for development, testing, and production at the [DSI](https://www.imperial.ac.uk/data-science/).

In a larger OVE installation opening browser windows may be sufficiently time-consuming for automation to be worthwhile.
Within the [DSI](https://www.imperial.ac.uk/data-science/), we use PowerShell scripts to launch browsers, make them full-screen, and navigate them to the correct URL.
On macOS, AppleScript could be used instead.

## Creating sections and launching apps

To actually display anything within OVE, it is necessary to create a section, load an app into it, and potentially also set the state of this app.

This can be done in several ways:

* by issuing HTTP ``GET`` and ``POST`` requests to the OVE core API directly using [``curl``](https://curl.haxx.se/docs/manpage.html)
* by using a custom launcher application that sends HTTP API requests directly
* by using the [Python wrapper](https://github.com/ove/ove-sdks) around this API

A future release of OVE will also include a web application that provides a graphical user interface for managing sections and their contents.
