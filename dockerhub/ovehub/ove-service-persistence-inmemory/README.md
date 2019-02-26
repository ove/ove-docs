# Supported tags and respective `Dockerfile` links

Please note that all docker files expect that you have [downloaded the source code](https://ove.readthedocs.io/en/stable/docs/INSTALLATION.html#downloading-source-code) corresponding to each specific version.

- [`latest-unstable`, (*Dockerfile*)](https://github.com/ove/ove-services/blob/master/packages/ove-service-persistence-inmemory/Dockerfile)
- [`0.1.1`, `stable`, (*0.1.1/Dockerfile*)](https://github.com/ove/ove-services/blob/v0.1.1/packages/ove-service-persistence-inmemory/Dockerfile)
- [`0.1.0`, (*0.1.0/Dockerfile*)](https://github.com/ove/ove-services/blob/v0.1.0/packages/ove-service-persistence-inmemory/Dockerfile)

# Pre-requisites

- All OVE Services require an instance of [OVE](../ovehub/ove) to be available before starting them.

# Installing and running the OVE In-Memory Persistence Service

Run the following command to start OVE In-Memory Persistence Service:

```sh
docker run -it --rm -p 8190:8190 --name ovehub-ove-service-persistence-inmemory ovehub/ove-service-persistence-inmemory:stable
```

After the application starts, follow the [guide on high availability of server-side application components](https://ove.readthedocs.io/en/stable/docs/BASIC_CONCEPTS.html#high-availability-of-server-side-application-components).

# Quick reference

- **Where to find more information**:<br/>
  [the project documentation](https://ove.readthedocs.io/en/stable/)

- **Where to report issues**:<br/>
  read [all open issues](https://data-science.doc.ic.ac.uk/ove/) and then report at [https://github.com/ove/ove-services/issues](https://github.com/ove/ove-services/issues)

- **Where to find the source code**:<br/>
  visit [https://github.com/ove/ove-services/tree/master/packages/ove-service-persistence-inmemory](https://github.com/ove/ove-services/tree/master/packages/ove-service-persistence-inmemory)

- **Source of this description**:<br/>
  [docs repo's `/ove-service-persistence-inmemory` directory](https://github.com/ove/ove-docs/tree/master/dockerhub/ovehub/ove-service-persistence-inmemory) ([history](https://github.com/ove/ove-docs/commits/master/dockerhub/ovehub/ove-service-persistence-inmemory))

- **Supported Docker versions**:<br/>
  [the latest release](https://github.com/docker/docker-ce/releases/latest) (down to 1.6 on a best-effort basis)

# What are OVE Persistence Services?

[Open Visualisation Environment (OVE)](https://github.com/ove/ove) is an open-source software stack, designed to be used in large scale visualisation environments. OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

OVE Persistence Services provide persistence for the [OVE](https://github.com/ove/ove) framework using various storage implementations. All persistence services confirm to a common API and can be registered with [OVE](https://github.com/ove/ove) or any OVE App.

# License

View [license information](https://github.com/ove/ove-services/blob/master/LICENSE) for the software contained in this image.
