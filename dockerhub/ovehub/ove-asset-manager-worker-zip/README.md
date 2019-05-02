# Supported tags and respective `Dockerfile` links

Please note that all docker files expect that you have [downloaded the source code](https://ove.readthedocs.io/en/stable/ove-asset-manager/docs/Install.html) corresponding to each specific version.

- [`latest-unstable`, (*Dockerfile*)](https://github.com/ove/ove-asset-manager/blob/master/docker/worker-zip/Dockerfile)
- [`0.1.0`, `stable`, (*0.1.0/Dockerfile*)](https://github.com/ove/ove-asset-manager/blob/v0.1.0/docker/worker-zip/Dockerfile)

# Installing and running OVE Asset Manager

Please refer the [Install Guide](https://ove.readthedocs.io/en/stable/ove-asset-manager/docs/Install.html) for more details.

# Quick reference

- **Where to find more information**:<br/>
  [the project documentation](https://ove.readthedocs.io/en/stable/)

- **Where to report issues**:<br/>
  read [all open issues](https://data-science.doc.ic.ac.uk/ove/) and then report at [https://github.com/ove/ove-asset-manager/issues](https://github.com/ove/ove-asset-manager/issues)

- **Where to find the source code**:<br/>
  visit [https://github.com/ove/ove-asset-manager](https://github.com/ove/ove-asset-manager)

- **Source of this description**:<br/>
  [docs repo's `/ove-asset-manager-worker-zip` directory](https://github.com/ove/ove-docs/tree/master/dockerhub/ovehub/ove-asset-manager-worker-zip) ([history](https://github.com/ove/ove-docs/commits/master/dockerhub/ovehub/ove-asset-manager-worker-zip))

- **Supported Docker versions**:<br/>
  [the latest release](https://github.com/docker/docker-ce/releases/latest) (down to 1.6 on a best-effort basis)

# What is the OVE Asset Manager?

[Open Visualisation Environment (OVE)](https://github.com/ove/ove) is an open-source software stack, designed to be used in large scale visualisation environments. OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

The OVE Asset Manager (AM) was designed to manage data corresponding to an installation of [Open Visualisation Environment (OVE)](https://github.com/ove/ove). It also includes a high speed proxy to provide authenticated access to data from a range of sources.

## Concepts

The AM stores files in an S3 compatible object store, such as [Minio](http://minio.io).
One instance of the Asset Manager can work with multiple stores.

An **asset** is a collection of one or more files that can be treated as a single unit and versioned, processed and displayed together. Each asset has associated metadata (e.g. processing state, name, description and tags).

Assets (and other objects in JSON format) can be grouped together into a **project**. While the AM does not assign any specific meaning to a project, and allows you to group assets by any criteria, other tools may interpret projects as indicating that particular content should be displayed together (e.g., a gallery application may display the assets in a selected project).

Each time any file in an asset is updated, a new **version** of the whole asset is recorded. Previous versions of the asset are retained, and can still be accessed.

**Workers** can asynchronously perform a task on a file, such as converting it to a new file format, according to a schedule. Workers operate non-destructively and do not modify or delete uploaded files. They therefore do not create new versions of an asset when they run.

This docker image contains the **ZIP worker**, which extracts the contents of a standard .zip archive file.

# License

View [license information](https://github.com/ove/ove-asset-manager/blob/master/LICENSE) for the software contained in this image.
