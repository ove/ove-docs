# Basic Concepts

An OVE `server` installation supports multiple `spaces`. A `space` is a collection of monitors, which may be attached to different computers, that together form a single display. OVE is designed to be used in Large High Resolution Display environments; but, it is also suitable for use on much smaller displays with a single or a few monitors.

In each space, OVE runs within a number of `clients`. An OVE `client` is a browser window and typically runs full-screen on a single `screen`. A `screen` can span a single monitor or can span multiple monitors that are attached to the same computer. The arrangement of `clients` is described in the [`Spaces.json` file](SPACES_JSON.md). Each `client` has its own `geometry` which is a combination of its `height`, `width`, and 2D coordinates (`x`, `y`). The values for `x` and `y` are equal to (0, 0) at the top-left corner of the `space` and increase on a per pixel basis from left to right and top to bottom, respectively.

An OVE `application` (or `app`) includes server-side and client-side components. Each of the [OVE Apps](../ove-apps/README.md) confirm to a [common structure](APP_DEVELOPMENT.md) and provide a way to display a distinct form of commonly used content (subject to the limitations described in the [list of pitfalls to avoid](PITFALLS.md)).

Each individual `instance` of an OVE `app` is designed to run within its own `section`. `Sections` may span multiple `clients` and can overlap. `Sections` are rectangular regions within an `oveCanvas`. Each `section` has its own `geometry` which is a combination of its `height`, `width`, and 2D coordinates (`x`, `y`). The `geometry` describes the region on which a `section` is deployed on an `oveCanvas`. An `oveCanvas` can also have `groups` of one or more `sections` and `groups`.

Each individual OVE `app` can have its own `configuration` (or `config`) defined within a [config.json](APP_DEVELOPMENT.md). The `config` is used to define named `states` other app-specific configuration, which are common to all app `instances`. Each individual `instance` of an OVE `app` can have its own `state` (which can be accessed using APIs exposed by each `app`).

Each OVE `section` does not have a background colour, and a wide majority of the apps have transparent backgrounds making it possible to overlay content from one app above another. This for example, makes it possible to use the [HTML App](../ove-apps/packages/ove-app-html/README.md) to display a legend for a chart or a network. All OVE apps also accept an `opacity` property (at creation time or when updated), making it possible to control the opacity of overlapping content.

![](images/concepts.svg)

## Runtime environment

Each OVE `client` displays the *view* page of OVE core. When a `section` is created, a corresponding [`iframe`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) is created within each `client` that it is associated with. The *view* of the corresponding `app` is loaded into this `iframe`.

In addition to these *views*, `apps` may present a *control* page that can be accessed directly through a web browser; this controller can communicate with the *views* running in `clients` using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

When the `iframe` representing a `section` is created, its `margin` CSS property is used to position it correctly, and the `window.ove.geometry` object is set so that each `instance` of an `app` running within each `iframe` can determine what to display.


## High availability of server-side application components

OVE provides a [Persistence Service](../ove-services/packages/ove-service-persistence-inmemory/README.md) which can be used to replicate server-side state among peers. This service can be registered with OVE core or any OVE application as explained in the [documentation](../ove-services/packages/ove-service-persistence-inmemory/README.md). OVE core also accepts registration of `peer` nodes using the `http://OVE_CORE_HOST:PORT/peers` API method. Once registered OVE peers will cross-post messages that are broadcasted using WebSockets.
