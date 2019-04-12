# Spaces.json File

The [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) is used to define the `spaces` of OVE and describe the arrangement of `clients` within each `space` (these terms are explained in the [Basic Concepts](BASIC_CONCEPTS.md) page). 

Each `client` must have its `geometry` specified by four properties:

* `h`: the height of the client in pixels
* `w`: the width of the client in pixels
* `x`: the x-coordinate of the top-left corner of the client (x-coordinate values begin at 0 and increase from left to right)
* `y`: the y-coordinate of the top-left corner of the client (y-coordinate values begin at 0 increase downards)

The order in which the `client`s are defined determines the `oveViewID` of each, and thus the URL that should be opened in each browser window.

By default, OVE assumes that there is a one-to-one mapping between `client` pixels and `screen` pixels. The optional `scale` property can be used to specify an alternative mapping. It accepts either a single scaling factor, or separate scaling factors for the x and y axes, similar to the [CSS `scale()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale#Syntax).

The default [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) defines two spaces (`LocalFour` and `LocalNine`), corresponding to `2x2` and `3x3` arrangements of clients. 

OVE **must be relaunched** after any changes are made to `Spaces.json`.


## Examples

Additional spaces can be defined by adding descriptions to the [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json).  

A number of example additions are provided below.

### Single client

A space having a single `client` with a 4K resolution can be defined by adding:

```json
"4K": [
    {"x": 0, "y": 0, "w": 3840, "h": 2160, "scale": 1}
]
```

The `scale` property is optional and can be omitted.

### `2x2` grid of screens

A `2x2` grid of `clients`, each with with Full HD (1080p) resolution can be defined by adding:

```json
"HDFour": [
    {"x": 0, "y": 1080, "w": 1920, "h": 1080},
    {"x": 1920, "y": 1080, "w": 1920, "h": 1080},
    {"x": 0, "y": 0, "w": 1920, "h": 1080},
    {"x": 1920, "y": 0, "w": 1920, "h": 1080}
]
```

In the above arrangement, the first `client` would be positioned bottom-left, the second `client` would be positioned bottom-right, the third `client` would be positioned top-left, and the fourth `client` would be positioned top-right.

### Non-contiguous arrangements and bezel correction

The specification of `clients` on the [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) need not always be contiguous and non-overlapping. The following is a perfectly valid configuration:

```json
"HDFour-alternative": [
    {"x": 0, "y": 1090, "w": 1920, "h": 1080},
    {"x": 1930, "y": 1090, "w": 1920, "h": 1080},
    {"x": 0, "y": 0, "w": 1920, "h": 1080},
    {"x": 1930, "y": 0, "w": 1920, "h": 1080}
]
```

The above arrangement leaves room for a `10 pixel` wide bezel between the each `client` in both horizontal and vertical directions and thereby creates a `space` of a `3850x2170` resolution (only 8,294,400 of the 8,354,500 pixels in this space are actually displayed by a `client`). 

The [Alignment App](../ove-apps/packages/ove-app-alignment/README.md) exists to help align the monitors by correcting the `space` configuration to compensate for the thickness of the bezels and any gaps that may exist between adjacent `screens`.
