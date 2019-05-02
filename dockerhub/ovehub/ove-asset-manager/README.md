# Supported tags and respective `Dockerfile` links

Please note that all docker files expect that you have [downloaded the source code](https://ove.readthedocs.io/en/latest/ove-asset-manager/docs/Install.html) corresponding to each specific version.

- [`latest-unstable`, (*Dockerfile*)](https://github.com/ove/ove-asset-manager/blob/master/docker/am/Dockerfile)
- [`0.1.0`, `stable`, (*0.1.0/Dockerfile*)](https://github.com/ove/ove-asset-manager/blob/v0.1.0/docker/am/Dockerfile)

# Pre-requisites

- All OVE UIs require an instance of [OVE](../ovehub/ove) to be available before starting them.

# Installing and running OVE Asset Manager

Please check the [Install Guide](https://ove.readthedocs.io/en/latest/ove-asset-manager/docs/Install.html) for more details.

# Quick reference

- **Where to find more information**:<br/>
  [the project documentation](https://ove.readthedocs.io/en/stable/)

- **Where to report issues**:<br/>
  read [all open issues](https://data-science.doc.ic.ac.uk/ove/) and then report at [https://github.com/ove/ove-asset-manager/issues](https://github.com/ove/ove-asset-manager/issues)

- **Where to find the source code**:<br/>
  visit [https://github.com/ove/ove-asset-manager](https://github.com/ove/ove-asset-manager)

- **Source of this description**:<br/>
  [docs repo's `/ove-asset-manager` directory](https://github.com/ove/ove-docs/tree/master/dockerhub/ovehub/ove-asset-manager) ([history](https://github.com/ove/ove-docs/commits/master/dockerhub/ovehub/ove-asset-manager))

- **Supported Docker versions**:<br/>
  [the latest release](https://github.com/docker/docker-ce/releases/latest) (down to 1.6 on a best-effort basis)

# What is the Asset Manager?

This repository contains an Asset Manager (AM) to manage data sets for access to an installation of [Open Visualisation Environment (OVE)](https://github.com/ove/ove), as well as a high speed proxy to provide authenticated access to data from a range of sources.

## Concepts

The Asset Manager stores files in an S3 compatible object **Store**, such as [Minio](http://minio.io).
One instance of the Asset Manager can work with multiple stores.

An **Asset** is a collection of one or more **files** that can be treated as a single unit and versioned, processed and displayed together. Each asset has associated metadata (e.g. processing state, name, description, tags, etc.).

Assets (and non-asset objects in JSON format) can be grouped together into a **Project**. While the AM does not assign any specific meaning to a project, and allows you to group assets by any criteria, other tools may interpret projects as indicating that particular content should be displayed together (e.g., a gallery might display all of the assets in a selected project).

Each time any file in an asset is updated, a new **Version** of the whole asset is recorded. Previous versions of the asset are retained, and can still be accessed.

**Workers** can be scheduled to asynchronously perform a task performed on a file, such as converting it to a new file format. Workers operate non-destructively and do not modify or delete uploaded files, so do not create new versions of an asset when they run.

The current docker image contains the **Backend** service.

# License

View [license information](https://github.com/ove/ove-asset-manager/blob/master/LICENSE) for the software contained in this image.