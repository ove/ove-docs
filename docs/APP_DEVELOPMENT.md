#  Developing OVE applications

OVE provides a number of apps to display commonly-used types of content, such as HTML, tiled images, maps, networks, and charts.
The HTML app is particularly flexible, and allows the hosting of general HTML/JavaScript web applications.
However, if existing apps do not meet your needs then you can write a new OVE app.

[``ove-lib-appbase``](https://github.com/ove/ove/tree/master/packages/ove-lib-appbase) provides a base library on whuch OVE apps can be built.


## App structure

An app typically has the structure:

    ├── README.md
    ├── package.json
    └── src
        ├── client
        │   ├── common
        │   │   ├── <app-name>.css
        │   │   └── <app-name>.js
        │   ├── constants
        │   │   └── <app-name>.js
        │   ├── control
        │   │   ├── <app-name>.css
        │   │   └── <app-name>.js
        │   ├── index.html
        │   └── view
        │       ├── <app-name>.css
        │       └── <app-name>.js
        ├── config.json
        ├── data
        └── index.js

At the top level, the ``README.md`` file explains the purpose and usage of the application in human-readable form, whereas ``package.json`` provides machine-readable information about the package (name, version, author, license), its dependencies, and build commands.

Within ``src/``, ``config.json`` describes any pre-configured ``states`` that are provided as examples (which may depend on data files in ``src/data``); ``src/index.js`` is the file that is actually run by node.js to create a server instance.

Apps are partitioned into separate a ``control`` and ``view``, with shared parts placed in ``src/client/common/`` (for CSS or JavaScript functions) or ``src/client/constants`` (for JavaScript constants).
A single ``index.html`` file is shared between the ``control`` and ``view``, but it may render different content in both cases due to the inclusion of different JavaScript files.

The JavaScript and CSS files in ``control/``  are used to render the application's control page; the JavaScript and CSS files in ``view/`` are used to render the page that is displayed when the app is loaded into a section.


## Index.html

Before the ``index.html`` file is served, the placeholders ``__OVEHOST__`` and ``__OVETYPE__`` are replaced (this replacement is specified by the ``registerRoutesForContent`` function defined in [``ove-lib-utils/src/index.js``](https://github.com/ove/ove/blob/5661ed9447c83aaa8ecb4d767172145d876654a3/packages/ove-lib-utils/src/index.js#L125) ).
``__OVEHOST__`` is replaced by the host-name that was specified by the environmental variable set in ``pm2.json``.
``__OVETYPE__`` is replaced by ``client`` or ``control``.

This mechanism allows the construction of paths for the inclusion of JavaScript or CSS files.


## Logging

Messages can be logged by creating a logger object, and then calling the method with the appropriate level (``error``, ``warn``, ``log``):

```` JavaScript
const log = OVE.Utils.Logger(Constants.APP_NAME, Constants.LOG_LEVEL);
log.debug('Starting application');
````


## App initialization

On document load, you should create a new OVE object attached to the window:

```` JavaScript
window.ove = new OVE(Constants.APP_NAME);
// perform initialization
window.ove.context.isInitialized = true;
````

As part of initialization, you should call ``OVE.Utils.initControl()`` or ``OVE.Utils.initView``: these accept a  function to perform any further initialization that will be called once they have completed.

You should also ensure that page elements have been resized appropriately.


### Resizing

``OVE.Utils`` provides two methods for automatically resizing a ``<div>`` element.
``OVE.Utils.resizeController(contentDivName)`` scales the element with ``id`` ``contentDivName``  to fit inside both the client and window, whilst maintaining the aspect ratio of the section/content; ``OVE.Utils.resizeViewer(contentDivName)`` resizes the element with ``id`` ``contentDivName`` to the size of the corresponding section (which may span multiple clients), and then translated based on the client's coordinates.


## Handling state

The OVE object has a child ``state`` object.
You can decide what this should contain, given the particular needs of your application.
To change the state, modify ``window.ove.state.current``.

The current application state can be sent as a WebSocket broadcast by calling ``OVE.Utils.broadcastState()`` (with no arguments).
This will update the current state on all clients that receive the message; you can register a callback function to be called when this change occurs using ``OVE.Utils.setOnStateUpdate(callbackFunctionName)``.


## Helper methods

``OVE.Utils`` provides a number of useful methods, such as ``OVE.Utils.getQueryParam()``

