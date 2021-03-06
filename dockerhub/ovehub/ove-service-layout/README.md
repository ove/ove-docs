# Supported tags and respective `Dockerfile` links

Please note that all docker files expect that you have [downloaded the source code](https://ove.readthedocs.io/en/stable/docs/INSTALLATION.html#downloading-source-code) corresponding to each specific version.

- [`latest-unstable`, (*Dockerfile*)](https://github.com/ove/ove-services/blob/master/packages/ove-service-layout/Dockerfile)

# Pre-requisites

- All OVE Services require an instance of [OVE](../ovehub/ove) to be available before starting them.

# Installing and running the OVE Layout Service

Run the following command to start OVE Layout Service:

```sh
docker run -it --rm -p 8180:8180 --name ovehub-ove-service-layout ovehub/ove-service-layout:stable
```

After the service starts, follow the [guide on using OVE](https://ove.readthedocs.io/en/stable/docs/USAGE.html).

# Quick reference

- **Where to find more information**:<br/>
  [the project documentation](https://ove.readthedocs.io/en/stable/)

- **Where to report issues**:<br/>
  read [all open issues](https://data-science.dsi.ic.ac.uk/ove/) and then report at [https://github.com/ove/ove-services/issues](https://github.com/ove/ove-services/issues)

- **Where to find the source code**:<br/>
  visit [https://github.com/ove/ove-services/tree/master/packages/ove-service-layout](https://github.com/ove/ove-services/tree/master/packages/ove-service-layout)

- **Source of this description**:<br/>
  [docs repo's `/ove-service-layout` directory](https://github.com/ove/ove-docs/tree/master/dockerhub/ovehub/ove-service-layout) ([history](https://github.com/ove/ove-docs/commits/master/dockerhub/ovehub/ove-service-layout))

- **Supported Docker versions**:<br/>
  [the latest release](https://github.com/docker/docker-ce/releases/latest) (down to 1.6 on a best-effort basis)

# What is OVE Layout Service?

[Open Visualisation Environment (OVE)](https://github.com/ove/ove) is an open-source software stack, designed to be used in large scale visualisation environments. OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

The Layout Service can be used to support [OVE](https://github.com/ove/ove) with more complex layouts, apart from the absolute coordinates system.

# License

View [license information](https://github.com/ove/ove-services/blob/master/LICENSE) for the software contained in this image.
