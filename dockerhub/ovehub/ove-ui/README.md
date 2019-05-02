# Supported tags and respective `Dockerfile` links

Please note that all docker files expect that you have [downloaded the source code](https://ove.readthedocs.io/en/stable/docs/INSTALLATION.html#downloading-source-code) corresponding to each specific version.

- [`latest-unstable`, (*Dockerfile*)](https://github.com/ove/ove-ui/blob/master/Dockerfile)
- [`0.1.0`, `stable`, (*0.1.0/Dockerfile*)](https://github.com/ove/ove-ui/blob/v0.1.0/Dockerfile)

# Pre-requisites

- All OVE UIs require an instance of [OVE](../ovehub/ove) to be available before starting them.

# Installing and running OVE UI

Run the following command to start OVE UI:

```sh
docker run -it --rm -p 8281-8284:8281-8284 -e OVE_HOST=localhost:8080 --name ovehub-ove-ui ovehub/ove-ui:stable
```

After the application starts, follow the [guide on using OVE](https://ove.readthedocs.io/en/stable/docs/USAGE.html).

# Quick reference

- **Where to find more information**:<br/>
  [the project documentation](https://ove.readthedocs.io/en/stable/)

- **Where to report issues**:<br/>
  read [all open issues](https://data-science.doc.ic.ac.uk/ove/) and then report at [https://github.com/ove/ove-ui/issues](https://github.com/ove/ove-ui/issues)

- **Where to find the source code**:<br/>
  visit [https://github.com/ove/ove-ui](https://github.com/ove/ove-ui)

- **Source of this description**:<br/>
  [docs repo's `/ove-ui` directory](https://github.com/ove/ove-docs/tree/master/dockerhub/ovehub/ove-ui) ([history](https://github.com/ove/ove-docs/commits/master/dockerhub/ovehub/ove-ui))

- **Supported Docker versions**:<br/>
  [the latest release](https://github.com/docker/docker-ce/releases/latest) (down to 1.6 on a best-effort basis)

# What are OVE UIs?

[Open Visualisation Environment (OVE)](https://github.com/ove/ove) is an open-source software stack, designed to be used in large scale visualisation environments. OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

OVE UIs are a collection of user interfaces designed to be used with [OVE](https://github.com/ove/ove).

# License

View [license information](https://github.com/ove/ove-ui/blob/master/LICENSE) for the software contained in this image.
