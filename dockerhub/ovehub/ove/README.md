# Supported tags and respective `Dockerfile` links

Please note that all docker files expect that you have [downloaded the source code](https://ove.readthedocs.io/en/stable/docs/INSTALLATION.html#downloading-source-code) corresponding to each specific version.

- [`latest-unstable`, (*Dockerfile*)](https://github.com/ove/ove/blob/master/Dockerfile)
- [`0.3.0`, `stable`, (*0.3.0/Dockerfile*)](https://github.com/ove/ove/blob/v0.3.0/Dockerfile)
- [`0.2.0`, (*0.2.0/Dockerfile*)](https://github.com/ove/ove/blob/v0.3.0/Dockerfile)

# Installing and running OVE

Run the following command to start OVE:

```sh
docker run -it --rm -p 8080:8080 --name ovehub-ove ovehub/ove:stable
```

After the application starts, navigate to [http://localhost:8080](http://localhost:8080) using a web browser. For detailed information on how to install OVE please refer the [Installation Guide](https://ove.readthedocs.io/en/stable/docs/INSTALLATION.html#installation-by-running-ove-installers).

# Quick reference

- **Where to find more information**:<br/>
  [the project documentation](https://ove.readthedocs.io/en/stable/)

- **Where to report issues**:<br/>
  read [all open issues](https://data-science.doc.ic.ac.uk/ove/) and then report at [https://github.com/ove/ove/issues](https://github.com/ove/ove/issues)

- **Where to find the source code**:<br/>
  visit [https://github.com/ove/ove](https://github.com/ove/ove)

- **Source of this description**:<br/>
  [docs repo's `/ove` directory](https://github.com/ove/ove-docs/tree/master/dockerhub/ovehub/ove) ([history](https://github.com/ove/ove-docs/commits/master/dockerhub/ovehub/ove))

- **Supported Docker versions**:<br/>
  [the latest release](https://github.com/docker/docker-ce/releases/latest) (down to 1.6 on a best-effort basis)

# What is OVE?

Open Visualisation Environment (OVE) is an open-source software stack, designed to be used in large scale visualisation environments. OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

# License

View [license information](https://github.com/ove/ove/blob/master/LICENSE) for the software contained in this image.
