# The Open Visualisation Environment (OVE)

OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

The main components of OVE are [**OVE Core**](https://github.com/ove/ove), which controls sections and the applications running within them and [**OVE Apps**](https://github.com/ove/ove-apps), which provide a set of useful applications for common tasks such as displaying webpages, images or videos and drawing graphs.

[**OVE Services**](https://github.com/ove/ove-services) provides core functionality microservices within OVE such as the [Layout Service](https://github.com/ove/ove-services/tree/master/packages/ove-service-layout), which is used to compute absolute positions in pixels from positions expressed relative to a grid or as a percentage of the total space size. [**OVE Asset Services**](https://github.com/ove/ove-asset-services) provides an Asset Manager along with a collection of Asset Processing Services, which are used to upload archives or divide large networks or images into tiles, and serve these to the corresponding applications.

OVE also provides a [graphical editor](https://github.com/ove/ove-editor) and [software development kits](https://github.com/ove/ove-sdks) that can be used to design and develop projects.

## Basic concepts

An OVE `server` installation supports multiple `spaces`. A `space` is a collection of monitors, which may be attached to different computers, that together form a single display. OVE is designed to be used in Large High Resolution Display environments; but, it is also suitable for use on much smaller displays with a single or a few monitors.

In each space, OVE runs within a number of `clients`. An OVE `client` is a browser window and typically runs full-screen on a single `screen`. A `screen` can be a single monitor or can span multiple monitors if they were all attached to a single computer. The arrangement of `clients` is described in the [`Spaces.json`](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) file.

An OVE `application` (or `app`) includes server-side and client-side components. Each [OVE App](https://github.com/ove/ove-apps/packages) confirm to a [common structure](./APP_DEVELOPMENT.md/#application-structure). Each of the [OVE Apps](https://github.com/ove/ove-apps) provide a way to display a distinct form of commonly used content (subject to the limitations described in the [list of pitfalls to avoid](./PITFALLS.md)).

Each individual `instance` of an OVE `app` is designed to run within its own `section`. `Sections` may span multiple `clients` and can overlap. `Sections` are rectangular regions within an `oveCanvas`. Each `section` has its own `geometry` which is a combination of its `height`, `width`, and 2D coordinates (`x`, `y`). The `geometry` describes the region on which a `section` is deployed on an `oveCanvas`. An `oveCanvas` can also have `groups` of one or more `sections` and `groups`.

Each individual OVE `app` can have its own `configuration` (or `config`) defined within a [config.json](./APP_DEVELOPMENT.md/#application-structure). The `config` is used to define named `states` other app-specific configuration, which are common to all app `instances`. Each individual `instance` of an OVE `app` can have its own `state` (which can be accessed using APIs exposed by each `app`).

![basic concepts](images/concepts.svg)

## Runtime environment

Each OVE `client` displays the *view* page of OVE core. When a `section` is created, a corresponding [`iframe`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) is created within each `client` that it is associated with. The *view* of the corresponding `app` is loaded into this `iframe`.

In addition to these *views*, `apps` may present a *control* page that can be accessed directly through a web browser; this controller can communicate with the *views* running in `clients` using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

![urls](images/urls.svg)

When the `iframe` representing a `section` is created, its `margin` CSS property is used to position it correctly, and the `window.ove.geometry` object is set so that each `instance` of an `app` running within each `iframe` can determine what to display.

![tiling](images/tiling.svg)

## Communication between components

In these diagrams, requests labelled `GET` and `POST` are HTTP requests; other messages are sent using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

### Managing sections

![create section](images/sequence-diagrams/create-section.svg)

![delete sections](images/sequence-diagrams/delete-sections.svg)

![delete section](images/sequence-diagrams/delete-section.svg)

### Managing state

![create state](images/sequence-diagrams/create-state.svg)

![load state](images/sequence-diagrams/load-state.svg)

![cache state](images/sequence-diagrams/update-state.svg)
