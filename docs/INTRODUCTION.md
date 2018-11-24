
# The Open Visualisation Environment (OVE)

OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.
It can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative groupwork.

It allows a user to control the display of content in web browsers distributed across multiple computers.
It does this by implementing a microservices architecture that allows the distributed execution of applications using web technologies.


The main components of OVE are  **OVE Core**, which controls sections and the applications running within them and **OVE Core Apps**, which provide a set of useful applications for common tasks such as displaying images, displaying webpages, and drawing graphs.
**OVE Services** provides core functionality microservices within OVE such as geometry.  **OVE Asset Services** provides services to divide large networks or images into tiles, and serve these to the corresponding applications.


## Concepts

OVE supports multiple ``spaces``. Each ``space`` is associated with one or more monitors, which may be attached to different computers, that together form a single display. This display may be a Large High Resolution Display (the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) is 2.53m x 6.00m in size and 30,720 x 4,320 in resolution and consists of 64 monitors), but OVE is also suitable for use on much smaller displays.

In each space, OVE runs within a number of ``clients``. Each ``client`` is a browser window, typically full-screen on a single monitor, but a single ``client`` can span multiple windows if they are attached to the same computer. The arrangement of ``clients`` is described in the [``Spaces.json``](https://github.com/dsi-icl/ove/blob/master/packages/ove-core/src/client/Spaces.json) file.

``Sections`` are rectangular regions within an ``oveCanvas``. Each ``section`` runs a single OVE ``app``. ``Sections`` may span multiple clients and can overlap.

An ``app`` displays something on the display. The official **core** ``apps`` each provide a way to display a distinct form of commonly used content.
They include an ``HTML app`` that can be used to display any visualization that run as web apps (subject to the limitations described in the [list of pitfalls to avoid](./PITFALLS.md)). 


![](images/concepts.svg)


## What runs

Each OVE ``client`` displays the *view* page of OVE core. When a ``section`` is created, a corresponding [``iframe``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) is created within each ``client`` that it overlaps, and the *view* of the corresponding app is loaded into this ``iframe``. 
In addition to these *views*, apps may present a *control* page that can be accessed directly through a web browser; this controller can communicate with the *views* running in ``clients`` using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

![](images/urls.svg)


When the ``iframes`` representing a section are created, its ``margin`` CSS property is used to position it correctly, and the ``window.ove.geometry`` object is set so that app running in the ``iframe`` can determine what to display.


![](images/tiling.svg)


## Communication between components

In these diagrams, requests labelled ``GET`` and ``POST`` are HTTP requests; other messages are sent using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

### Managing sections

![](images/sequence-diagrams/create-section.svg)

![](images/sequence-diagrams/delete-sections.svg)

![](images/sequence-diagrams/delete-section.svg)

### Managing state

![](images/sequence-diagrams/create-state.svg)

![](images/sequence-diagrams/load-state.svg)

![](images/sequence-diagrams/update-state.svg)

