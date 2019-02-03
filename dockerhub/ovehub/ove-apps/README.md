# Supported tags and respective `Dockerfile` links

Please note that all docker files expect that you have [downloaded the source code](https://dsi.gitbook.io/ove/installation#downloading-source-code) corresponding to each specific version.

- [`latest-unstable`, (*Dockerfile*)](https://github.com/ove/ove-apps/blob/master/Dockerfile)
- [`0.3.0`, `stable`, (*0.3.0/Dockerfile*)](https://github.com/ove/ove-apps/blob/v0.3.0/Dockerfile)
- [`0.2.0`, (*0.2.0/Dockerfile*)](https://github.com/ove/ove-apps/blob/v0.3.0/Dockerfile)

# Pre-requisites

- All OVE Apps require an instance of [OVE](../ovehub/ove) to be available before starting them.
- The [SVG App](https://github.com/ove/ove-apps/tree/master/packages/ove-app-svg) requires an instance of [Tuoris](../ovehub/ove-external-tuoris) to be available before starting it.
- The [WebRTC App](https://github.com/ove/ove-apps/tree/master/packages/ove-app-webrtc) requires an instance of [OpenVidu](../openvidu/openvidu-server-kms) to be available before starting it.

# Installing and running OVE Apps

Run the following command to start OVE Apps:

```sh
docker run -it --rm -p 8081-8094:8081-8094 -e OVE_HOST=localhost:8080 -e TUORIS_HOST=localhost:7080 -e OPENVIDU_HOST=localhost:4443 --name ovehub-ove-apps ovehub/ove-apps:stable
```

After the application starts, follow the [guide on launching OVE Apps](https://dsi.gitbook.io/ove/usage#launching-ove-apps).

# Quick reference

- **Where to find more information**:<br/>
  [the project documentation](https://dsi.gitbook.io/ove)

- **Where to report issues**:<br/>
  read [all open issues](https://data-science.doc.ic.ac.uk/ove/) and then report at [https://github.com/ove/ove-apps/issues](https://github.com/ove/ove-apps/issues)

- **Where to find the source code**:<br/>
  visit [https://github.com/ove/ove-apps](https://github.com/ove/ove-apps)

- **Source of this description**:<br/>
  [docs repo's `/ove-apps` directory](https://github.com/ove/ove-docs/tree/master/dockerhub/ovehub/ove-apps) ([history](https://github.com/ove/ove-docs/commits/master/dockerhub/ovehub/ove-apps))

- **Supported Docker versions**:<br/>
  [the latest release](https://github.com/docker/docker-ce/releases/latest) (down to 1.6 on a best-effort basis)

# What are OVE Apps?

[Open Visualisation Environment (OVE)](https://github.com/ove/ove) is an open-source software stack, designed to be used in large scale visualisation environments. OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

OVE Apps are a collection of applications designed to run within [OVE](https://github.com/ove/ove).

# License

View [license information](https://github.com/ove/ove-apps/blob/master/LICENSE) for the software contained in this image.
