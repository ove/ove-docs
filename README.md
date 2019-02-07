# Open Visualisation Environment

Open Visualisation Environment (OVE) is an open-source software stack, designed to be used in large scale visualisation environments. OVE was developed to meet the requirements of controlling the [Data Observatory](https://www.imperial.ac.uk/data-science/data-observatory/) at the [Data Science Institute](https://www.imperial.ac.uk/data-science/) of [Imperial College London](https://www.imperial.ac.uk), but it is not specialized for that purpose.

OVE can be used for visual analytics on Large High Resolution Displays, for presentations, or for collaborative group work. It allows a user to control the display of content in web browsers distributed across multiple computers by implementing a microservices architecture that allows the distributed execution of applications using web technologies.

The main components of OVE are [**OVE Core**](https://github.com/ove/ove), which controls sections and the applications running within them and [**OVE Apps**](../ove-apps/README.md), which provide a set of useful applications for common tasks such as displaying webpages, images or videos and drawing graphs.

[**OVE Services**](../ove-services/README.md) provides core functionality microservices within OVE such as the [Persistence Service](../ove-services/packages/ove-service-persistence-inmemory/README.md), which is used to compute absolute positions in pixels from positions expressed relative to a grid or as a percentage of the total space size. [**OVE Asset Services**](https://github.com/ove/ove-asset-services) provides an Asset Manager along with a collection of Asset Processing Services, which are used to upload archives or divide large networks or images into tiles, and serve these to the corresponding applications.

OVE also provides a [graphical editor](https://github.com/ove/ove-editor) and [software development kits](https://github.com/ove/ove-sdks) that can be used to design and develop projects.
