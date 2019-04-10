# Spaces.json File

The [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) is used to define the `spaces` of OVE and describe the arrangement of `clients` in each `space`. Each `client` must have its `geometry` specified as `h`, `w`, `x` and `y`, which are a combination of  its `height`, `width`, and 2D coordinates. More information on these terms can be found in the [Basic Concepts](BASIC_CONCEPTS.md) page.

The client's `geometry` is specified in pixels and it corresponds to the pixel dimensions of the `screen`. Unless a `scale` property has been set, there must a one-to-one mapping between `client` pixels and `screen` pixels. The optional `scale` property can be used to specify variable `client` pixel to `screen` pixel mappings. The `scale` property accepts either one or two values, similar to the [CSS `scale()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale#Syntax).

By default, two spaces, `LocalFour` and `LocalNine` are configured in the [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json). They represent arrangements of 4 and 9 `clients` in `2x2` and `3x3` matrices, respectively.  OVE expects all `spaces` to be pre-configured before it is launched. Therefore, it is important to configure any other `spaces` as a part of the OVE [installation process](INSTALLATION.md). To add a new space having a single `client` with a 4K resolution, the following needs to be added to the [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json):

```json
"4K": [
    {"x": 0, "y": 0, "w": 3840, "h": 2160, "scale": 1}
]
```

The `scale` property is optional and can be omitted.

An arrangement of 4 `clients` with HD resolution in a `2x2` matrix, requires the following configuration to be added to the [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json):

```json
"HDFour": [
    {"x": 0, "y": 1080, "w": 1920, "h": 1080},
    {"x": 1920, "y": 1080, "w": 1920, "h": 1080},
    {"x": 0, "y": 0, "w": 1920, "h": 1080},
    {"x": 1920, "y": 0, "w": 1920, "h": 1080}
]
```

In the above arrangement, the first `client` would be placed on the bottom-left `screen`, the second `client` would be placed on the bottom-right `screen`, the third `client` would be placed on the top-left, and the fourth `client` would be placed on the top-right `screen`. If the ordering of the `screens` need to be changed for any reason, the order in which the `clients` are specified on the [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) should also be changed accordingly.

The specification of `clients` on the [`Spaces.json` file](https://github.com/ove/ove/blob/master/packages/ove-core/src/client/Spaces.json) need not always be contiguous and non-overlapping. The following is a perfectly valid configuration:

```json
"HDFour-alternative": [
    {"x": 0, "y": 1090, "w": 1920, "h": 1080},
    {"x": 1930, "y": 1090, "w": 1920, "h": 1080},
    {"x": 0, "y": 0, "w": 1920, "h": 1080},
    {"x": 1930, "y": 0, "w": 1920, "h": 1080}
]
```

The above arrangement leaves room for a `10-pixel` wide bezel between the each `screen` in both horizontal and vertical directions and thereby creates a `space` of a `3850x2170` resolution. 

The [Alignment App](../ove-apps/packages/ove-app-alignment/README.md) exists to help align the monitors by correcting the `space` configuration to compensate for the thickness of the bezels and any gaps that may exist between adjacent `screens`.
