# Developing OVE applications

OVE provides a number of applications to display commonly-used types of content, such as HTML, tiled images, audio and video files, maps, networks, and charts.
The HTML application is particularly flexible, and allows the hosting of general HTML/JavaScript web applications.
However, if existing applications do not meet your needs then you can write a new OVE app.

[`@ove-lib/appbase`](https://www.npmjs.com/package/@ove-lib/appbase) provides a base library on which OVE applications can be built.

## Application structure

An application typically has the structure:

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
        ├── swagger-extensions.yaml
        └── index.js

At the top level, the `README.md` file explains the purpose and usage of the application in human-readable form, whereas `package.json` provides machine-readable information about the package (name, version, author, license), its dependencies, and build commands.

Within `src/`, `config.json` describes any pre-configured `states` that are provided as examples (which may depend on data files in `src/data`); `src/index.js` is the file that is actually run by node.js to create a server instance.
The [`@ove-lib/appbase`](https://www.npmjs.com/package/@ove-lib/appbase) base library exposes an API to interact with the app. If the application exposes additional API methods the `src/swagger-extensions.yaml` is used to describe them, so that [Swagger](https://swagger.io/solutions/api-documentation/) can automatically generate documentation.

Applications are partitioned into separate a `control` and `view`, with shared parts placed in `src/client/common/` (for CSS or JavaScript functions) or `src/client/constants` (for JavaScript constants).
A single `index.html` file is shared between the `control` and `view`, but it renders different content in both cases due to the inclusion of different JavaScript files.

The JavaScript and CSS files in `control/`  are used to render the application's control page; the JavaScript and CSS files in `view/` are used to render the page that is displayed when the application is loaded into a section.

## The index.html file

Before the `index.html` file is served, the placeholders `__OVEHOST__` and `__OVETYPE__` are replaced (this replacement is specified by the `registerRoutesForContent` function defined in [`ove-lib-utils/src/index.js`](https://github.com/ove/ove/blob/5661ed9447c83aaa8ecb4d767172145d876654a3/packages/ove-lib-utils/src/index.js#L125) ).
`__OVEHOST__` is replaced by the host-name that was specified by the `OVE_HOST` environment variable set in `pm2.json` (or `docker-compose.yml`).
`__OVETYPE__` is replaced by `view` or `control`.

This mechanism allows the construction of paths for the inclusion of JavaScript or CSS files.

## Logging

Messages can be logged by creating a `OVE.Utils.Logger` object, and then calling the method with the appropriate level (`fatal`, `error`, `warn`, `debug`, `info` or `trace`):

``` JavaScript
const log = OVE.Utils.Logger(Constants.APP_NAME, Constants.LOG_LEVEL);
log.debug('Starting application');
```

## The index.js file and server-side application initialization

For most applications the `index.js` would look similar to:

``` JavaScript
const { Constants } = require('./client/constants/<app-nam>');
const { app, log } = require('@ove-lib/appbase')(__dirname, Constants.APP_NAME);
const server = require('http').createServer(app);

const port = process.env.PORT || 8080;
server.listen(port);
log.info(Constants.APP_NAME, 'application started, port:', port);
```

The [`@ove-lib/appbase`](https://www.npmjs.com/package/@ove-lib/appbase) base library also exposes `express`, `nodeModules` and `config`. These can be used to register express routes, to expose nodule modules or to access application-specific configuration found in the `config.json` file.
To expose a node module from your application:

``` JavaScript
const { express, app, log, nodeModules } = require('@ove-lib/appbase')(__dirname, Constants.APP_NAME);
const path = require('path');

log.debug('Using module:', '<module-name>');
app.use('/', express.static(path.join(nodeModules, '<module-name>', '<module-directory>')));
```

### The swagger-extensions.yaml file

The `swagger-extensions.yaml` is optional and only found in applications exposing REST API methods. Contents of this file include definitions of [Paths](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#pathsObject) and [Tags](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#tagObject) objects according to the [Swagger 2.0 Specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md).

## Clint-side application initialization

On document load, you should create a new OVE object attached to the `window` object of the web browser:

``` JavaScript
window.ove = new OVE(Constants.APP_NAME);
// perform initialization
window.ove.context.isInitialized = true;
```

As part of initialization, you should call `OVE.Utils.initControl` or `OVE.Utils.initView`:

``` JavaScript
const initControl = function (data) {
    // perform further initialization.
}
OVE.Utils.initControl(Constants.DEFAULT_STATE_NAME, initControl);
```

`OVE.Utils.initControl` accepts a function to perform any further initialization that will be called once OVE initializes the controller of the app. It also accepts the name of the default `state` to be loaded as a part
of the initialization process.

``` JavaScript
const initView = function () {
    // perform initialization before OVE loads the viewer.
}
const onStateLoaded = function () {
    // called immediately after the state is loaded.
}
OVE.Utils.initView(initView, onStateLoaded);
```

`OVE.Utils.initView` accepts a function to perform initialization before OVE initializes the viewer of the app. Unlike the controller, the viewer needs to be pre-initialized. This is to ensure JavaScript libraries are appropriately initialized before the application state is loaded. `OVE.Utils.initView` also accepts a function that gets called immediately after the state is loaded to the viewer.

If there are any further initialization that needs to be done after OVE initializes the viewer of the app, `OVE.Utils.initView` also accepts an optional function as its third parameter:

``` JavaScript
const postInitView = function () {
    // perform further initialization.
}
OVE.Utils.initView(initView, onStateLoaded, postInitView);
```

You should also ensure that page elements have been resized appropriately.

### Resizing

`OVE.Utils` provides two methods for automatically resizing a `<div>` element.
`OVE.Utils.resizeController(contentDivName)` scales the element with `id` `contentDivName`  to fit inside both the client and window, whilst maintaining the aspect ratio of the section/content; `OVE.Utils.resizeViewer(contentDivName)` resizes the element with `id` `contentDivName` to the size of the corresponding section (which may span multiple clients), and then translated based on the client's coordinates.

## The OVE object

The OVE object (`window.ove`) provides a number of useful functions and data structures to handle state, to interpret layout and to communicate via WebSockets. It also provides a context (`window.ove.context`) to hold the application's local variables. The `window.ove.context.uuid` property provides a unique identifier for each instance of OVE. This can be used to uniquely identify each viewer and controller in the system. The `window.ove.context.hostname` property provides the hostname of the ove.js library.

### Handling state

The `window.ove.state` object provides a `window.ove.state.current` data structure to hold the current application state. You can decide what this should contain, given the particular needs of your application.

The current application state (contents of `window.ove.state.current`) can be sent as a WebSocket broadcast by calling `OVE.Utils.broadcastState()` (with no arguments). This will update the current state on all clients that receive the message; you can register a callback function to be called when this change occurs using `OVE.Utils.setOnStateUpdate(callbackFunctionName)`.

The `window.ove.state` object also provides two other methods `cache` and `load`, which can be used to cache the application state on the server and load it sometime later. These methods are internally called by the utility methods provided by `OVE.Utils` and therefore their use is limited to a few advanced use-cases.

### Interpreting layout

The `window.ove.layout` provides information useful to interpret the layout of the clients:

* `window.ove.layout.x` - Displacement along the x-axis relative to the top-left of the section in pixels
* `window.ove.layout.y` - Displacement along the y-axis relative to the top-left of the section in pixels
* `window.ove.layout.w` - Width of the client
* `window.ove.layout.h` - Height of the client
* `window.ove.layout.section.w` - Width of the section (or the total width of the application)
* `window.ove.layout.section.h` - Height of the section (or the total height of the application)
* `window.ove.layout.space.w` - Width of the space (or the total width of all clients)
* `window.ove.layout.space.h` - Height of the space (or the total height of all clients)
* `window.ove.layout.offset.x` - Displacement of top-left of the client along the x-axis relative to the top-left of the browser window in pixels
* `window.ove.layout.offset.y` - Displacement of top-left of the client along the y-axis relative to the top-left of the browser window in pixels

While all of this information is available on a fully initialized viewer, the controller only has:

* `window.ove.layout.section.w` - Width of the section (or the total width of the application)
* `window.ove.layout.section.h` - Height of the section (or the total height of the application)

### Communicating via WebSockets

The `window.ove.socket` provides two functions `send` and `on` to send and receive messages using WebSockets:

``` JavaScript
window.ove.socket.on(function (message) {
    // logic to interpret the message
});
window.ove.socket.send(message);
```

The `message` argument represents a JSON serializable object in both methods. These methods are particularly useful to trigger remote operations or to expose JavaScript functionality using REST APIs.

## Helper methods

`OVE.Utils` provides a number of useful methods, such as `OVE.Utils.getQueryParam(name, defaultValue)`, `OVE.Utils.getSpace()`, `OVE.Utils.getClient()` and `OVE.Utils.getSectionId()`.

`OVE.Utils.Coordinates.transform(vector, inputType, outputType)` provides a mechanism to convert coordinates of one format to another. The input and output types can be one of `OVE.Utils.Coordinates.SCREEN`, `OVE.Utils.Coordinates.SECTION` or `OVE.Utils.Coordinates.SPACE`:

``` JavaScript
// Get location of mouse pointer within the space.
function onMouseEvent(event) {
    const spaceCoordinates = OVE.Utils.Coordinates.transform(
        [event.clientX, event.clientY], OVE.Utils.Coordinates.SCREEN, OVE.Utils.Coordinates.SPACE)
}
```
